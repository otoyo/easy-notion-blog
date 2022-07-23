import { NOTION_API_SECRET, DATABASE_ID } from './server-constants'
import {
  Post,
  Block,
  Paragraph,
  Heading1,
  Heading2,
  Heading3,
  BulletedListItem,
  NumberedListItem,
  Image,
  Code,
  Quote,
  Equation,
  Callout,
  Embed,
  Video,
  Bookmark,
  LinkPreview,
  Table,
  TableRow,
  TableCell,
  RichText,
  Text,
  Annotation,
} from './interfaces'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('@notionhq/client')
import * as blogIndexCache from './blog-index-cache'

const client = new Client({
  auth: NOTION_API_SECRET,
})

export async function getPosts(pageSize = 10) {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts.slice(0, pageSize)
  }

  const params = {
    database_id: DATABASE_ID,
    filter: _buildFilter(),
    sorts: [
      {
        property: 'Date',
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
    page_size: pageSize,
  }

  const data = await client.databases.query(params)

  return data.results
    .filter(item => _validPost(item))
    .map(item => _buildPost(item))
}

export async function getAllPosts() {
  let results = []

  if (blogIndexCache.exists()) {
    results = blogIndexCache.get()
    console.log('Found cached posts.')
  } else {
    const params = {
      database_id: DATABASE_ID,
      filter: _buildFilter(),
      sorts: [
        {
          property: 'Date',
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
      page_size: 100,
    }

    while (true) {
      const data = await client.databases.query(params)

      results = results.concat(data.results)

      if (!data.has_more) {
        break
      }

      params['start_cursor'] = data.next_cursor
    }
  }

  return results.filter(item => _validPost(item)).map(item => _buildPost(item))
}

export async function getRankedPosts(pageSize = 10) {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts
      .filter(post => !!post.Rank)
      .sort((a, b) => {
        if (a.Rank > b.Rank) {
          return -1
        } else if (a.Rank === b.Rank) {
          return 0
        }
        return 1
      })
      .slice(0, pageSize)
  }

  const params = {
    database_id: DATABASE_ID,
    filter: _buildFilter([
      {
        property: 'Rank',
        number: {
          is_not_empty: true,
        },
      },
    ]),
    sorts: [
      {
        property: 'Rank',
        direction: 'descending',
      },
    ],
    page_size: pageSize,
  }

  const data = await client.databases.query(params)

  return data.results
    .filter(item => _validPost(item))
    .map(item => _buildPost(item))
}

export async function getPostsBefore(date: string, pageSize = 10) {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts.filter(post => post.Date < date).slice(0, pageSize)
  }

  const params = {
    database_id: DATABASE_ID,
    filter: _buildFilter([
      {
        property: 'Date',
        date: {
          before: date,
        },
      },
    ]),
    sorts: [
      {
        property: 'Date',
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
    page_size: pageSize,
  }

  const data = await client.databases.query(params)

  return data.results
    .filter(item => _validPost(item))
    .map(item => _buildPost(item))
}

export async function getFirstPost() {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts[allPosts.length - 1]
  }

  const params = {
    database_id: DATABASE_ID,
    filter: _buildFilter(),
    sorts: [
      {
        property: 'Date',
        timestamp: 'created_time',
        direction: 'ascending',
      },
    ],
    page_size: 1,
  }

  const data = await client.databases.query(params)

  if (!data.results.length) {
    return null
  }

  if (!_validPost(data.results[0])) {
    return null
  }

  return _buildPost(data.results[0])
}

export async function getPostBySlug(slug: string) {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts.find(post => post.Slug === slug)
  }

  const data = await client.databases.query({
    database_id: DATABASE_ID,
    filter: _buildFilter([
      {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    ]),
    sorts: [
      {
        property: 'Date',
        timestamp: 'created_time',
        direction: 'ascending',
      },
    ],
  })

  if (!data.results.length) {
    return null
  }

  if (!_validPost(data.results[0])) {
    return null
  }

  return _buildPost(data.results[0])
}

export async function getPostsByTag(tag: string, pageSize = 100) {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts.filter(post => post.Tags.includes(tag)).slice(0, pageSize)
  }

  const params = {
    database_id: DATABASE_ID,
    filter: _buildFilter([
      {
        property: 'Tags',
        multi_select: {
          contains: tag,
        },
      },
    ]),
    sorts: [
      {
        property: 'Date',
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
    page_size: pageSize,
  }

  const data = await client.databases.query(params)

  return data.results
    .filter(item => _validPost(item))
    .map(item => _buildPost(item))
}

export async function getPostsByTagBefore(
  tag: string,
  date: string,
  pageSize = 100
) {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts
      .filter(post => {
        return post.Tags.includes(tag) && new Date(post.Date) < new Date(date)
      })
      .slice(0, pageSize)
  }

  const params = {
    database_id: DATABASE_ID,
    filter: _buildFilter([
      {
        property: 'Tags',
        multi_select: {
          contains: tag,
        },
      },
      {
        property: 'Date',
        date: {
          before: date,
        },
      },
    ]),
    sorts: [
      {
        property: 'Date',
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
    page_size: pageSize,
  }

  const data = await client.databases.query(params)

  return data.results
    .filter(item => _validPost(item))
    .map(item => _buildPost(item))
}

export async function getFirstPostByTag(tag: string) {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    const sameTagPosts = allPosts.filter(post => post.Tags.includes(tag))
    return sameTagPosts[sameTagPosts.length - 1]
  }

  const params = {
    database_id: DATABASE_ID,
    filter: _buildFilter([
      {
        property: 'Tags',
        multi_select: {
          contains: tag,
        },
      },
    ]),
    sorts: [
      {
        property: 'Date',
        timestamp: 'created_time',
        direction: 'ascending',
      },
    ],
    page_size: 1,
  }

  const data = await client.databases.query(params)

  if (!data.results.length) {
    return null
  }

  if (!_validPost(data.results[0])) {
    return null
  }

  return _buildPost(data.results[0])
}

export async function getAllBlocksByBlockId(blockId: string) {
  let allBlocks: Block[] = []

  const params = {
    block_id: blockId,
  }

  while (true) {
    const data = await client.blocks.children.list(params)

    const blocks = data.results.map(item => {
      const block: Block = {
        Id: item.id,
        Type: item.type,
        HasChildren: item.has_children,
      }

      switch (item.type) {
        case 'paragraph':
          const paragraph: Paragraph = {
            RichTexts: item.paragraph.rich_text.map(_buildRichText),
            Color: item.paragraph.color,
          }

          block.Paragraph = paragraph
          break
        case 'heading_1':
          const heading1: Heading1 = {
            RichTexts: item.heading_1.rich_text.map(_buildRichText),
            Color: item.heading_1.color,
          }

          block.Heading1 = heading1
          break
        case 'heading_2':
          const heading2: Heading2 = {
            RichTexts: item.heading_2.rich_text.map(_buildRichText),
            Color: item.heading_2.color,
          }

          block.Heading2 = heading2
          break
        case 'heading_3':
          const heading3: Heading3 = {
            RichTexts: item.heading_3.rich_text.map(_buildRichText),
            Color: item.heading_3.color,
          }

          block.Heading3 = heading3
          break
        case 'bulleted_list_item':
          const bulletedListItem: BulletedListItem = {
            RichTexts: item.bulleted_list_item.rich_text.map(_buildRichText),
            Color: item.bulleted_list_item.color,
          }

          block.BulletedListItem = bulletedListItem
          break
        case 'numbered_list_item':
          const numberedListItem: NumberedListItem = {
            RichTexts: item.numbered_list_item.rich_text.map(_buildRichText),
            Color: item.numbered_list_item.color,
          }

          block.NumberedListItem = numberedListItem
          break
        case 'video':
          const video: Video = {
            Type: item.video.type,
          }

          if (item.video.type === 'external') {
            video.External = { Url: item.video.external.url }
          }

          block.Video = video
          break
        case 'image':
          const image: Image = {
            Caption: item.image.caption.map(_buildRichText),
            Type: item.image.type,
          }

          if (item.image.type === 'external') {
            image.External = { Url: item.image.external.url }
          } else {
            image.File = { Url: item.image.file.url, ExpiryTime: item.image.file.expiry_time }
          }

          block.Image = image
          break
        case 'code':
          const code: Code = {
            Caption: item[item.type].caption.map(_buildRichText),
            Text: item[item.type].rich_text.map(_buildRichText),
            Language: item.code.language,
          }

          block.Code = code
          break
        case 'quote':
          const quote: Quote = {
            Text: item[item.type].rich_text.map(_buildRichText),
            Color: item[item.type].color,
          }

          block.Quote = quote
          break
        case 'equation':
          const equation: Equation = {
            Expression: item[item.type].expression,
          }

          block.Equation = equation
          break
        case 'callout':
          const callout: Callout = {
            RichTexts: item[item.type].rich_text.map(_buildRichText),
            Icon: {
              Emoji: item[item.type].icon.emoji,
            },
            Color: item[item.type].color,
          }

          block.Callout = callout
          break
        case 'embed':
          const embed: Embed = {
            Url: item.embed.url,
          }

          block.Embed = embed
          break
        case 'bookmark':
          const bookmark: Bookmark = {
            Url: item.bookmark.url,
          }

          block.Bookmark = bookmark
          break
        case 'link_preview':
          const linkPreview: LinkPreview = {
            Url: item.link_preview.url,
          }

          block.LinkPreview = linkPreview
          break
        case 'table':
          const table: Table = {
            TableWidth: item.table.table_width,
            HasColumnHeader: item.table.has_column_header,
            HasRowHeader: item.table.has_row_header,
            Rows: [],
          }

          block.Table = table
          break
        case 'table_row':
          const cells: TableCell[] = item.table_row.cells.map(cell => {
            const tableCell: TableCell = {
              RichTexts: cell.map(_buildRichText),
            }

            return tableCell
          })

          const tableRow: TableRow = {
            Cells: cells,
          }

          block.TableRow = tableRow
          break
      }

      return block
    })

    allBlocks = allBlocks.concat(blocks)

    if (!data.has_more) {
      break
    }

    params['start_cursor'] = data.next_cursor
  }

  for (let i = 0; i < allBlocks.length; i++) {
    const block = allBlocks[i]

    if (block.Type === 'table') {
      // Fetch table_row
      block.Table.Rows = await getAllBlocksByBlockId(block.Id)
    } else if (block.Type === 'bulleted_list_item' && block.HasChildren) {
      block.BulletedListItem.Children = await getAllBlocksByBlockId(block.Id)
    } else if (block.Type === 'numbered_list_item' && block.HasChildren) {
      block.NumberedListItem.Children = await getAllBlocksByBlockId(block.Id)
    }
  }

  return allBlocks
}

export async function getAllTags() {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return [...new Set(allPosts.flatMap(post => post.Tags))].sort()
  }

  const data = await client.databases.retrieve({
    database_id: DATABASE_ID,
  })
  return data.properties.Tags.multi_select.options
    .map(option => option.name)
    .sort()
}

function _buildFilter(conditions = []) {
  if (process.env.NODE_ENV === 'development') {
    return { and: conditions }
  }

  return {
    and: _uniqueConditions(
      conditions.concat([
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'Date',
          date: {
            on_or_before: new Date().toISOString(),
          },
        },
      ])
    ),
  }
}

function _uniqueConditions(conditions = []) {
  const properties = []

  return conditions.filter(cond => {
    if (properties.includes(cond.property)) {
      return false
    }
    properties.push(cond.property)
    return true
  })
}

function _validPost(data) {
  const prop = data.properties
  return (
    prop.Page.title.length > 0 &&
    prop.Slug.rich_text.length > 0 &&
    !!prop.Date.date
  )
}

function _buildPost(data) {
  const prop = data.properties

  const post: Post = {
    PageId: data.id,
    Title: prop.Page.title[0].plain_text,
    Slug: prop.Slug.rich_text[0].plain_text,
    Date: prop.Date.date.start,
    Tags: prop.Tags.multi_select.map(opt => opt.name),
    Excerpt:
      prop.Excerpt.rich_text.length > 0
        ? prop.Excerpt.rich_text[0].plain_text
        : '',
    OGImage:
      prop.OGImage.files.length > 0 ? prop.OGImage.files[0].file.url : null,
    Rank: prop.Rank.number,
  }

  return post
}

function _buildRichText(item) {
  const annotation: Annotation = {
    Bold: item.annotations.bold,
    Italic: item.annotations.italic,
    Strikethrough: item.annotations.strikethrough,
    Underline: item.annotations.underline,
    Code: item.annotations.code,
    Color: item.annotations.color,
  }

  const richText: RichText = {
    Annotation: annotation,
    PlainText: item.plain_text,
    Href: item.href,
  }

  if (item.type === 'text') {
    const text: Text = {
      Content: item.text.content,
      Link: item.text.link,
    }
    richText.Text = text
  } else if (item.type === 'equation') {
    const equation: Equation = {
      Expression: item.equation.expression,
    }
    richText.Equation = equation
  }

  return richText
}

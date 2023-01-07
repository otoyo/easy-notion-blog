import { NOTION_API_SECRET, DATABASE_ID } from '../../app/server-constants'
import * as responses from './responses'
import {
  Post,
  Block,
  Paragraph,
  Heading1,
  Heading2,
  Heading3,
  BulletedListItem,
  NumberedListItem,
  ToDo,
  Image,
  Code,
  Quote,
  Equation,
  Callout,
  Embed,
  Video,
  Bookmark,
  LinkPreview,
  SyncedBlock,
  SyncedFrom,
  Table,
  TableRow,
  TableCell,
  Toggle,
  ColumnList,
  Column,
  TableOfContents,
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

export async function getPosts(pageSize = 10): Promise<Post[]> {
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

  const res: responses.QueryDatabaseResponse = await client.databases.query(params)

  return res.results
    .filter(pageObject => _validPageObject(pageObject))
    .map(pageObject => _buildPost(pageObject))
}

export async function getAllPosts(): Promise<Post[]> {
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
      const res: responses.QueryDatabaseResponse = await client.databases.query(params)

      results = results.concat(res.results)

      if (!res.has_more) {
        break
      }

      params['start_cursor'] = res.next_cursor
    }
  }

  return results
    .filter(pageObject => _validPageObject(pageObject))
    .map(pageObject => _buildPost(pageObject))
}

export async function getRankedPosts(pageSize = 10): Promise<Post[]> {
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

  const res: responses.QueryDatabaseResponse = await client.databases.query(params)

  return res.results
    .filter(pageObject => _validPageObject(pageObject))
    .map(pageObject => _buildPost(pageObject))
}

export async function getPostsBefore(date: string, pageSize = 10): Promise<Post[]> {
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

  const res: responses.QueryDatabaseResponse = await client.databases.query(params)

  return res.results
    .filter(pageObject => _validPageObject(pageObject))
    .map(pageObject => _buildPost(pageObject))
}

export async function getFirstPost(): Promise<Post|null> {
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

  const res: responses.QueryDatabaseResponse = await client.databases.query(params)

  if (!res.results.length) {
    return null
  }

  if (!_validPageObject(res.results[0])) {
    return null
  }

  return _buildPost(res.results[0])
}

export async function getPostBySlug(slug: string): Promise<Post|null> {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts.find(post => post.Slug === slug)
  }

  const res: responses.QueryDatabaseResponse = await client.databases.query({
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

  if (!res.results.length) {
    return null
  }

  if (!_validPageObject(res.results[0])) {
    return null
  }

  return _buildPost(res.results[0])
}

export async function getPostsByTag(tag: string | undefined, pageSize = 100): Promise<Post[]> {
  if (!tag) return []

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

  const res: responses.QueryDatabaseResponse = await client.databases.query(params)

  return res.results
    .filter(pageObject => _validPageObject(pageObject))
    .map(pageObject => _buildPost(pageObject))
}

export async function getPostsByTagBefore(
  tag: string,
  date: string,
  pageSize = 100
): Promise<Post[]> {
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

  const res: responses.QueryDatabaseResponse = await client.databases.query(params)

  return res.results
    .filter(pageObject => _validPageObject(pageObject))
    .map(pageObject => _buildPost(pageObject))
}

export async function getFirstPostByTag(tag: string): Promise<Post|null> {
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

  const res: responses.QueryDatabaseResponse = await client.databases.query(params)

  if (!res.results.length) {
    return null
  }

  if (!_validPageObject(res.results[0])) {
    return null
  }

  return _buildPost(res.results[0])
}

export async function getAllBlocksByBlockId(blockId: string): Promise<Block[]> {
  let allBlocks: Block[] = []

  const params = {
    block_id: blockId,
  }

  while (true) {
    const res: responses.RetrieveBlockChildrenResponse = await client.blocks.children.list(params)

    const blocks = res.results.map(blockObject => _buildBlock(blockObject))

    allBlocks = allBlocks.concat(blocks)

    if (!res.has_more) {
      break
    }

    params['start_cursor'] = res.next_cursor
  }

  for (let i = 0; i < allBlocks.length; i++) {
    const block = allBlocks[i]

    if (block.Type === 'table') {
      block.Table.Rows = await _getTableRows(block.Id)
    } else if (block.Type === 'column_list') {
      block.ColumnList.Columns = await _getColumns(block.Id)
    } else if (block.Type === 'bulleted_list_item' && block.HasChildren) {
      block.BulletedListItem.Children = await getAllBlocksByBlockId(block.Id)
    } else if (block.Type === 'numbered_list_item' && block.HasChildren) {
      block.NumberedListItem.Children = await getAllBlocksByBlockId(block.Id)
    } else if (block.Type === 'to_do' && block.HasChildren) {
      block.ToDo.Children = await getAllBlocksByBlockId(block.Id)
    } else if (block.Type === 'synced_block') {
      block.SyncedBlock.Children = await _getSyncedBlockChildren(block)
    } else if (block.Type === 'toggle') {
      block.Toggle.Children = await getAllBlocksByBlockId(block.Id)
    } else if (block.Type === 'paragraph' && block.HasChildren) {
      block.Paragraph.Children = await getAllBlocksByBlockId(block.Id)
    } else if (block.Type === 'heading_1' && block.HasChildren) {
      block.Heading1.Children = await getAllBlocksByBlockId(block.Id)
    } else if (block.Type === 'heading_2' && block.HasChildren) {
      block.Heading2.Children = await getAllBlocksByBlockId(block.Id)
    } else if (block.Type === 'heading_3' && block.HasChildren) {
      block.Heading3.Children = await getAllBlocksByBlockId(block.Id)
    } else if (block.Type === 'quote' && block.HasChildren) {
      block.Quote.Children = await getAllBlocksByBlockId(block.Id)
    } else if (block.Type === 'callout' && block.HasChildren) {
      block.Callout.Children = await getAllBlocksByBlockId(block.Id)
    }
  }

  return allBlocks
}

export async function getBlock(blockId: string): Promise<Block> {
  const res: responses.RetrieveBlockResponse = await client.blocks.retrieve({
    block_id: blockId,
  })

  return _buildBlock(res)
}

function _buildBlock(blockObject: responses.BlockObject): Block {
  const block: Block = {
    Id: blockObject.id,
    Type: blockObject.type,
    HasChildren: blockObject.has_children,
  }

  switch (blockObject.type) {
    case 'paragraph':
      const paragraph: Paragraph = {
        RichTexts: blockObject.paragraph.rich_text.map(_buildRichText),
        Color: blockObject.paragraph.color,
      }

      block.Paragraph = paragraph
      break
    case 'heading_1':
      const heading1: Heading1 = {
        RichTexts: blockObject.heading_1.rich_text.map(_buildRichText),
        Color: blockObject.heading_1.color,
        IsToggleable: blockObject.heading_1.is_toggleable,
      }

      block.Heading1 = heading1
      break
    case 'heading_2':
      const heading2: Heading2 = {
        RichTexts: blockObject.heading_2.rich_text.map(_buildRichText),
        Color: blockObject.heading_2.color,
        IsToggleable: blockObject.heading_2.is_toggleable,
      }

      block.Heading2 = heading2
      break
    case 'heading_3':
      const heading3: Heading3 = {
        RichTexts: blockObject.heading_3.rich_text.map(_buildRichText),
        Color: blockObject.heading_3.color,
        IsToggleable: blockObject.heading_3.is_toggleable,
      }

      block.Heading3 = heading3
      break
    case 'bulleted_list_item':
      const bulletedListItem: BulletedListItem = {
        RichTexts: blockObject.bulleted_list_item.rich_text.map(_buildRichText),
        Color: blockObject.bulleted_list_item.color,
      }

      block.BulletedListItem = bulletedListItem
      break
    case 'numbered_list_item':
      const numberedListItem: NumberedListItem = {
        RichTexts: blockObject.numbered_list_item.rich_text.map(_buildRichText),
        Color: blockObject.numbered_list_item.color,
      }

      block.NumberedListItem = numberedListItem
      break
    case 'to_do':
      const toDo: ToDo = {
        RichTexts: blockObject.to_do.rich_text.map(_buildRichText),
        Checked: blockObject.to_do.checked,
        Color: blockObject.to_do.color,
      }

      block.ToDo = toDo
      break
    case 'video':
      const video: Video = {
        Type: blockObject.video.type,
      }

      if (blockObject.video.type === 'external') {
        video.External = { Url: blockObject.video.external.url }
      }

      block.Video = video
      break
    case 'image':
      const image: Image = {
        Caption: blockObject.image.caption.map(_buildRichText),
        Type: blockObject.image.type,
      }

      if (blockObject.image.type === 'external') {
        image.External = { Url: blockObject.image.external.url }
      } else {
        image.File = { Url: blockObject.image.file.url, ExpiryTime: blockObject.image.file.expiry_time }
      }

      block.Image = image
      break
    case 'code':
      const code: Code = {
        Caption: blockObject[blockObject.type].caption.map(_buildRichText),
        RichTexts: blockObject[blockObject.type].rich_text.map(_buildRichText),
        Language: blockObject.code.language,
      }

      block.Code = code
      break
    case 'quote':
      const quote: Quote = {
        RichTexts: blockObject[blockObject.type].rich_text.map(_buildRichText),
        Color: blockObject[blockObject.type].color,
      }

      block.Quote = quote
      break
    case 'equation':
      const equation: Equation = {
        Expression: blockObject[blockObject.type].expression,
      }

      block.Equation = equation
      break
    case 'callout':
      const callout: Callout = {
        RichTexts: blockObject[blockObject.type].rich_text.map(_buildRichText),
        Icon: {
          Emoji: blockObject[blockObject.type].icon.emoji,
        },
        Color: blockObject[blockObject.type].color,
      }

      block.Callout = callout
      break
    case 'synced_block':
      let syncedFrom: SyncedFrom = null
      if (blockObject[blockObject.type].synced_from && blockObject[blockObject.type].synced_from.block_id) {
        syncedFrom = {
          BlockId: blockObject[blockObject.type].synced_from.block_id,
        }
      }

      const syncedBlock: SyncedBlock = {
        SyncedFrom: syncedFrom,
      }

      block.SyncedBlock = syncedBlock
      break
    case 'toggle':
      const toggle: Toggle = {
        RichTexts: blockObject[blockObject.type].rich_text.map(_buildRichText),
        Color: blockObject[blockObject.type].color,
        Children: [],
      }

      block.Toggle = toggle
      break
    case 'embed':
      const embed: Embed = {
        Url: blockObject.embed.url,
      }

      block.Embed = embed
      break
    case 'bookmark':
      const bookmark: Bookmark = {
        Url: blockObject.bookmark.url,
      }

      block.Bookmark = bookmark
      break
    case 'link_preview':
      const linkPreview: LinkPreview = {
        Url: blockObject.link_preview.url,
      }

      block.LinkPreview = linkPreview
      break
    case 'table':
      const table: Table = {
        TableWidth: blockObject.table.table_width,
        HasColumnHeader: blockObject.table.has_column_header,
        HasRowHeader: blockObject.table.has_row_header,
        Rows: [],
      }

      block.Table = table
      break
    case 'column_list':
      const columnList: ColumnList = {
        Columns: [],
      }

      block.ColumnList = columnList
      break
    case 'table_of_contents':
      const tableOfContents: TableOfContents = {
        Color: blockObject.table_of_contents.color,
      }

      block.TableOfContents = tableOfContents
      break
  }

  return block
}

async function _getTableRows(blockId: string): Promise<TableRow[]> {
  let tableRows: TableRow[] = []

  const params = {
    block_id: blockId,
  }

  while (true) {
    const res: responses.RetrieveBlockChildrenResponse = await client.blocks.children.list(params)

    const blocks = res.results.map(blockObject => {
      const tableRow: TableRow = {
        Id: blockObject.id,
        Type: blockObject.type,
        HasChildren: blockObject.has_children,
        Cells: []
      }

      if (blockObject.type === 'table_row') {
        const cells: TableCell[] = blockObject.table_row.cells.map(cell => {
          const tableCell: TableCell = {
            RichTexts: cell.map(_buildRichText),
          }

          return tableCell
        })

        tableRow.Cells = cells
      }

      return tableRow
    })

    tableRows = tableRows.concat(blocks)

    if (!res.has_more) {
      break
    }

    params['start_cursor'] = res.next_cursor
  }

  return tableRows
}

async function _getColumns(blockId: string): Promise<Column[]> {
  let columns: Column[] = []

  const params = {
    block_id: blockId,
  }

  while (true) {
    const res: responses.RetrieveBlockChildrenResponse = await client.blocks.children.list(params)

    const blocks = await Promise.all(res.results.map(async blockObject => {
      const children = await getAllBlocksByBlockId(blockObject.id)

      const column: Column = {
        Id: blockObject.id,
        Type: blockObject.type,
        HasChildren: blockObject.has_children,
        Children: children,
      }

      return column
    }))

    columns = columns.concat(blocks)

    if (!res.has_more) {
      break
    }

    params['start_cursor'] = res.next_cursor
  }

  return columns
}

async function _getSyncedBlockChildren(block: Block): Promise<Block[]> {
  let originalBlock: Block = block
  if (block.SyncedBlock.SyncedFrom && block.SyncedBlock.SyncedFrom.BlockId) {
    originalBlock = await getBlock(block.SyncedBlock.SyncedFrom.BlockId)
  }

  const children = await getAllBlocksByBlockId(originalBlock.Id)
  return children
}

export async function getAllTags(): Promise<string[]> {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return [...new Set(allPosts.flatMap(post => post.Tags))].sort()
  }

  const res: responses.RetrieveDatabaseResponse = await client.databases.retrieve({
    database_id: DATABASE_ID,
  })
  return res.properties.Tags.multi_select.options
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

function _validPageObject(pageObject: responses.PageObject): boolean {
  const prop = pageObject.properties
  return (
    prop.Page.title.length > 0 &&
    prop.Slug.rich_text.length > 0 &&
    !!prop.Date.date
  )
}

function _buildPost(pageObject: responses.PageObject): Post {
  const prop = pageObject.properties

  const post: Post = {
    PageId: pageObject.id,
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

function _buildRichText(richTextObject: responses.RichTextObject): RichText {
  const annotation: Annotation = {
    Bold: richTextObject.annotations.bold,
    Italic: richTextObject.annotations.italic,
    Strikethrough: richTextObject.annotations.strikethrough,
    Underline: richTextObject.annotations.underline,
    Code: richTextObject.annotations.code,
    Color: richTextObject.annotations.color,
  }

  const richText: RichText = {
    Annotation: annotation,
    PlainText: richTextObject.plain_text,
    Href: richTextObject.href,
  }

  if (richTextObject.type === 'text') {
    const text: Text = {
      Content: richTextObject.text.content,
    }

    if (richTextObject.text.link) {
      text.Link = {
        Url: richTextObject.text.link.url,
      }
    }

    richText.Text = text
  } else if (richTextObject.type === 'equation') {
    const equation: Equation = {
      Expression: richTextObject.equation.expression,
    }
    richText.Equation = equation
  }

  return richText
}

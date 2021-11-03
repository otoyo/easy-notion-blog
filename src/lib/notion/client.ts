import { NOTION_API_SECRET, DATABASE_ID } from './server-constants'
const { Client } = require('@notionhq/client')
const blogIndexCache = require('./blog-index-cache.js')

const client = new Client({
  auth: NOTION_API_SECRET,
})

interface Post {
  PageId: string
  Title: string
  Slug: string
  Date: string
  Tags: string[]
  Excerpt: string
  OGImage: string
  Rank: number
}

interface Block {
  Id: string
  Type: string
  HasChildren: boolean
}

interface ParagraphBlock extends Block {
  RichTexts: RichText[]
}

interface HeadingBlock extends Block {
  RichTexts: RichText[]
}

interface ListBlock extends Block {
  RichTexts: RichText[]
}

interface ImageBlock extends Block {
  Image: Image
}

interface CodeBlock extends Block {
  Code: Code
}

interface QuoteBlock extends Block {
  Quote: Quote
}

interface CalloutBlock extends Block {
  Callout: Callout
}

interface Image {
  Caption: RichText[]
  Type: string
  File: File
}

interface File {
  Url: string
}

interface Code {
  Text: RichText[]
  Language: string
}

interface Quote {
  Text: RichText[]
}

interface Callout {
  RichTexts: RichText[]
  Icon: Icon
}

interface RichText {
  Text: Text
  Annotation: Annotation
  PlainText: string
  Href?: string
}

interface Text {
  Content: string
  Link?: Link
}

interface Icon {
  Emoji: string
}

interface Annotation {
  Bold: boolean
  Italic: boolean
  Strikethrough: boolean
  Underline: boolean
  Code: boolean
  Color: string
}

interface Link {
  Url: string
}

export async function getPosts(pageSize: number = 10) {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts.slice(0, pageSize)
  }

  let params = {
    database_id: DATABASE_ID,
    filter: {
      and: [
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
      ],
    },
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

  return data.results.map(item => _buildPost(item))
}

export async function getAllPosts() {
  let results = []

  if (blogIndexCache.exists()) {
    results = blogIndexCache.get()
    console.log('Found cached posts.')
  } else {
    let params = {
      database_id: DATABASE_ID,
      filter: {
        and: [
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
        ],
      },
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

  return results.map(item => _buildPost(item))
}

export async function getRankedPosts(pageSize: number = 10) {
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
    filter: {
      and: [
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
        {
          property: 'Rank',
          number: {
            is_not_empty: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Rank',
        direction: 'descending',
      },
    ],
    page_size: pageSize,
  }

  const data = await client.databases.query(params)

  return data.results.map(item => _buildPost(item))
}

export async function getPostsBefore(date: string, pageSize: number = 10) {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts.filter(post => post.Date < date).slice(0, pageSize)
  }

  const params = {
    database_id: DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'Date',
          date: {
            before: date,
          },
        },
      ],
    },
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

  return data.results.map(item => _buildPost(item))
}

export async function getFirstPost() {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts[allPosts.length - 1]
  }

  const params = {
    database_id: DATABASE_ID,
    filter: {
      and: [
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
      ],
    },
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

  return _buildPost(data.results[0])
}

export async function getPostBySlug(slug: string) {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts.find(post => post.Slug === slug)
  }

  const data = await client.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: [
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
        {
          property: 'Slug',
          text: {
            equals: slug,
          },
        },
      ],
    },
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

  return _buildPost(data.results[0])
}

export async function getPostsByTag(tag: string, pageSize: number = 100) {
  if (blogIndexCache.exists()) {
    const allPosts = await getAllPosts()
    return allPosts.filter(post => post.Tags.includes(tag)).slice(0, pageSize)
  }

  let params = {
    database_id: DATABASE_ID,
    filter: {
      and: [
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
        {
          property: 'Tags',
          multi_select: {
            contains: tag,
          },
        },
      ],
    },
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

  return data.results.map(item => _buildPost(item))
}

export async function getAllBlocksByPageId(pageId) {
  let allBlocks: Block[] = []

  let params = {
    block_id: pageId,
  }

  while (true) {
    const data = await client.blocks.children.list(params)

    const blocks = data.results.map(item => {
      let block = null

      switch (item.type) {
        case 'paragraph':
        case 'heading_1':
        case 'heading_2':
        case 'heading_3':
        case 'bulleted_list_item':
        case 'numbered_list_item':
          block = {
            Id: item.id,
            Type: item.type,
            HasChildren: item.has_children,
            RichTexts: item[item.type].text.map(item => {
              const text: Text = {
                Content: item.text.content,
                Link: item.text.link,
              }

              const annotation: Annotation = {
                Bold: item.annotations.bold,
                Italic: item.annotations.italic,
                Strikethrough: item.annotations.strikethrough,
                Underline: item.annotations.underline,
                Code: item.annotations.code,
                Color: item.annotations.color,
              }

              const richText: RichText = {
                Text: text,
                Annotation: annotation,
                PlainText: item.plain_text,
                Href: item.href,
              }

              return richText
            }),
          }
          break
        case 'image':
          const image: Image = {
            Caption: item.image.caption.map(item => {
              const text: Text = {
                Content: item.text.content,
                Link: item.text.link,
              }

              const annotation: Annotation = {
                Bold: item.annotations.bold,
                Italic: item.annotations.italic,
                Strikethrough: item.annotations.strikethrough,
                Underline: item.annotations.underline,
                Code: item.annotations.code,
                Color: item.annotations.color,
              }

              const richText: RichText = {
                Text: text,
                Annotation: annotation,
                PlainText: item.plain_text,
                Href: item.href,
              }

              return richText
            }),
            Type: item.image.type,
            File: {
              Url: item.image.file.url,
            },
          }

          block = {
            Id: item.id,
            Type: item.type,
            HasChildren: item.has_children,
            Image: image,
          }
          break
        case 'code':
          const code: Code = {
            Text: item[item.type].text.map(item => {
              const text: Text = {
                Content: item.text.content,
                Link: item.text.link,
              }

              const annotation: Annotation = {
                Bold: item.annotations.bold,
                Italic: item.annotations.italic,
                Strikethrough: item.annotations.strikethrough,
                Underline: item.annotations.underline,
                Code: item.annotations.code,
                Color: item.annotations.color,
              }

              const richText: RichText = {
                Text: text,
                Annotation: annotation,
                PlainText: item.plain_text,
                Href: item.href,
              }

              return richText
            }),
            Language: item.code.language,
          }

          block = {
            Id: item.id,
            Type: item.type,
            HasChildren: item.has_children,
            Code: code,
          }
          break
        case 'quote':
          const quote: Quote = {
            Text: item[item.type].text.map(item => {
              const text: Text = {
                Content: item.text.content,
                Link: item.text.link,
              }

              const annotation: Annotation = {
                Bold: item.annotations.bold,
                Italic: item.annotations.italic,
                Strikethrough: item.annotations.strikethrough,
                Underline: item.annotations.underline,
                Code: item.annotations.code,
                Color: item.annotations.color,
              }

              const richText: RichText = {
                Text: text,
                Annotation: annotation,
                PlainText: item.plain_text,
                Href: item.href,
              }

              return richText
            }),
          }

          block = {
            Id: item.id,
            Type: item.type,
            HasChildren: item.has_children,
            Quote: quote,
          }
          break
        case 'callout':
          const callout: Callout = {
            RichTexts: item[item.type].text.map(item => {
              const text: Text = {
                Content: item.text.content,
                Link: item.text.link,
              }

              const annotation: Annotation = {
                Bold: item.annotations.bold,
                Italic: item.annotations.italic,
                Strikethrough: item.annotations.strikethrough,
                Underline: item.annotations.underline,
                Code: item.annotations.code,
                Color: item.annotations.color,
              }

              const richText: RichText = {
                Text: text,
                Annotation: annotation,
                PlainText: item.plain_text,
                Href: item.href,
              }

              return richText
            }),
            Icon: {
              Emoji: item[item.type].icon.emoji,
            },
          }

          block = {
            Id: item.id,
            Type: item.type,
            HasChildren: item.has_children,
            Callout: callout,
          }
          break
        default:
          block = {
            Id: item.id,
            Type: item.type,
            HasChildren: item.has_children,
          }
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

function _buildPost(data) {
  const prop = data.properties

  const post: Post = {
    PageId: data.id,
    Title: prop.Page.title[0].plain_text,
    Slug: prop.Slug.rich_text[0].plain_text,
    Date: prop.Date.date.start,
    Tags: prop.Tags.multi_select.map(opt => opt.name),
    Excerpt: prop.Excerpt.rich_text[0].plain_text,
    OGImage:
      prop.OGImage.files.length > 0 ? prop.OGImage.files[0].file.url : null,
    Rank: prop.Rank.number,
  }

  return post
}

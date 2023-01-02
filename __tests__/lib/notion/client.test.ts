jest.mock('../../../lib/notion/blog-index-cache')

import {
  getPosts,
  getAllBlocksByBlockId,
  getAllTags,
} from '../../../lib/notion/client'

import {
  Post,
  Block,
  Annotation,
} from '../../../lib/notion/interfaces'

describe('getPosts', () => {
  const expected: Post[] = [
    {
      PageId: "ed0090ef-628c-4cfd-a8ea-1a5326855f8a",
      Title: "あのイーハトーヴォのすきとおった風",
      Slug: "ihatov",
      Date: "2021-11-06",
      Tags: ["Diary"],
      Excerpt: "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
      OGImage: null,
      Rank: 3,
    },
  ]

  it('resolves 1 post', async () => {
    const posts = await getPosts()
    expect(posts).toHaveLength(1)
  })

  it('resolves 1 post as Post', async () => {
    const posts = await getPosts()
    expect(posts).toMatchObject(expected)
  })
})

describe('getAllBlocksByBlockId', () => {
  const pageBlockId = 'ed0090ef-628c-4cfd-a8ea-1a5326855f8a'
  const annotation: Annotation = {
    Bold: false,
    Italic: false,
    Strikethrough: false,
    Underline: false,
    Code: false,
    Color: 'default',
  }

  it('resolves paragraph with text block', async () => {
    const expected: Block = {
      Id: '5d04be89-54da-482a-9391-efd465f74082',
      Type: 'paragraph',
      HasChildren: false,
      Paragraph: {
        RichTexts: [
          {
            Annotation: annotation,
            PlainText: 'Paragraph with text',
            Text: {
              Content: 'Paragraph with text',
              Link: {
                Url: 'https://github.com/otoyo/easy-notion-blog',
              },
            },
            Href: 'https://github.com/otoyo/easy-notion-blog',
          }
        ],
        Color: 'default',
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const paragraph = blocks.find((block: Block) => block.Type === 'paragraph')
    expect(paragraph).toMatchObject(expected)
  })

  it('resolves paragraph with equation block', async () => {
    const expected: Block = {
      Id: '91807f43-f95b-4079-8fcd-0ed4d3757648',
      Type: 'paragraph',
      HasChildren: false,
      Paragraph: {
        RichTexts: [
          {
            Annotation: annotation,
            PlainText: 'e=mc^2',
            Equation: {
              Expression: 'e=mc^2',
            },
          }
        ],
        Color: 'default',
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const paragraph = blocks.filter((block: Block) => block.Type === 'paragraph')[1]
    expect(paragraph).toMatchObject(expected)
  })

  it('resolves heading_1 block', async () => {
    const expected: Block = {
      Id: '5d04be89-54da-482a-9391-efd465f74082',
      Type: 'heading_1',
      HasChildren: false,
      Heading1: {
        RichTexts: [
          {
            Annotation: annotation,
            PlainText: 'Heading 1'
          }
        ],
        Color: 'default',
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const heading1 = blocks.find((block: Block) => block.Type === 'heading_1')
    expect(heading1).toMatchObject(expected)
  })

  it('resolves heading_2 block', async () => {
    const expected: Block = {
      Id: '5d04be89-54da-482a-9391-efd465f74082',
      Type: 'heading_2',
      HasChildren: false,
      Heading2: {
        RichTexts: [
          {
            Annotation: annotation,
            PlainText: 'Heading 2'
          }
        ],
        Color: 'default',
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const heading2 = blocks.find((block: Block) => block.Type === 'heading_2')
    expect(heading2).toMatchObject(expected)
  })

  it('resolves heading_3 block', async () => {
    const expected: Block = {
      Id: '5d04be89-54da-482a-9391-efd465f74082',
      Type: 'heading_3',
      HasChildren: false,
      Heading3: {
        RichTexts: [
          {
            Annotation: annotation,
            PlainText: 'Heading 3'
          }
        ],
        Color: 'default',
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const heading3 = blocks.find((block: Block) => block.Type === 'heading_3')
    expect(heading3).toMatchObject(expected)
  })

  it('resolves bulleted_list_item block', async () => {
    const expected: Block[] = [
      {
        Id: '071398ed-89a4-41a4-a750-2bc247969ba8',
        Type: 'bulleted_list_item',
        HasChildren: false,
        BulletedListItem: {
          RichTexts: [
            {
              Annotation: annotation,
              PlainText: 'Bulleted List Item 1'
            }
          ],
          Color: 'default',
        },
      },
      {
        Id: '9c3ce9a5-5f9f-47b1-95c7-acd0034958a7',
        Type: 'bulleted_list_item',
        HasChildren: false,
        BulletedListItem: {
          RichTexts: [
            {
              Annotation: annotation,
              PlainText: 'Bulleted List Item 2'
            }
          ],
          Color: 'default',
        },
      },
    ]

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const bulletedListItems = blocks.filter((block: Block) => block.Type === 'bulleted_list_item')
    expect(bulletedListItems).toMatchObject(expected)
  })

  it('resolves numbered_list_item block', async () => {
    const expected: Block[] = [
      {
        Id: 'b5cb3105-db27-48fd-8965-d5f3083b7fdf',
        Type: 'numbered_list_item',
        HasChildren: false,
        NumberedListItem: {
          RichTexts: [
            {
              Annotation: annotation,
              PlainText: 'Numbered List Item 1'
            }
          ],
          Color: 'default',
        },
      },
      {
        Id: 'e6077145-ccbe-4440-938b-0feaa60857ee',
        Type: 'numbered_list_item',
        HasChildren: false,
        NumberedListItem: {
          RichTexts: [
            {
              Annotation: annotation,
              PlainText: 'Numbered List Item 2'
            }
          ],
          Color: 'default',
        },
      },
    ]

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const numberedListItems = blocks.filter((block: Block) => block.Type === 'numbered_list_item')
    expect(numberedListItems).toMatchObject(expected)
  })

  it('resolves to_do block', async () => {
    const expected: Block[] = [
      {
        Id: '04543c2a-b9f1-4fcc-8ff9-70196353c63a',
        Type: 'to_do',
        HasChildren: false,
        ToDo: {
          RichTexts: [
            {
              Annotation: annotation,
              PlainText: 'To Do 1'
            }
          ],
          Color: 'default',
          Checked: true,
        },
      },
      {
        Id: '69e1b54a-afa0-45e3-ab7f-145a3f3447fe',
        Type: 'to_do',
        HasChildren: false,
        ToDo: {
          RichTexts: [
            {
              Annotation: annotation,
              PlainText: 'To Do 2'
            }
          ],
          Color: 'default',
          Checked: false,
        },
      },
    ]

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const toDoItems = blocks.filter((block: Block) => block.Type === 'to_do')
    expect(toDoItems).toMatchObject(expected)
  })

  it('resolves video block', async () => {
    const expected: Block = {
      Id: '200e46e7-640b-4239-96c4-2c4e0d1d36ed',
      Type: 'video',
      HasChildren: false,
      Video: {
        Type: 'external',
        External: {
          Url: 'https://website.domain/files/video.mp4',
        },
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const video = blocks.find((block: Block) => block.Type === 'video')
    expect(video).toMatchObject(expected)
  })

  it('resolves image block', async () => {
    const expected: Block[] = [
      {
        Id: '5d04be89-54da-482a-9391-efd465f74082',
        Type: 'image',
        HasChildren: false,
        Image: {
          Caption: [
            {
              Annotation: annotation,
              PlainText: 'File Image'
            }
          ],
          Type: 'file',
          File: {
            Url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5d04be89-54da-482a-9391-efd465f74082/profile.png',
            ExpiryTime: '2022-02-12T02:58:46.940Z',
          },
        },
      },
      {
        Id: 'd0f99954-8161-489d-ab8d-72e00f51c4db',
        Type: 'image',
        HasChildren: false,
        Image: {
          Caption: [
            {
              Annotation: annotation,
              PlainText: 'External Image'
            }
          ],
          Type: 'external',
          External: {
            Url: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
          },
        },
      },
    ]

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const images = blocks.filter((block: Block) => block.Type === 'image')
    expect(images).toMatchObject(expected)
  })

  it('resolves code block', async () => {
    const expected: Block = {
      Id: '5d04be89-54da-482a-9391-efd465f74082',
      Type: 'code',
      HasChildren: false,
      Code: {
        Caption: [
          {
            Annotation: annotation,
            PlainText: 'Code'
          }
        ],
        RichTexts: [
          {
            Annotation: annotation,
            PlainText: "console.log('This is Code Block.')"
          }
        ],
        Language: 'javascript',
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const code = blocks.find((block: Block) => block.Type === 'code')
    expect(code).toMatchObject(expected)
  })

  it('resolves quote block', async () => {
    const expected: Block = {
      Id: '5d04be89-54da-482a-9391-efd465f74082',
      Type: 'quote',
      HasChildren: false,
      Quote: {
        RichTexts: [
          {
            Annotation: annotation,
            PlainText: 'Quote'
          }
        ],
        Color: 'default',
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const quote = blocks.find((block: Block) => block.Type === 'quote')
    expect(quote).toMatchObject(expected)
  })

  it('resolves equation block', async () => {
    const expected: Block = {
      Id: 'cf1cb592-3258-41cc-bcac-4f633f87228c',
      Type: 'equation',
      HasChildren: false,
      Equation: {
        Expression: 'e=mc^2',
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const equation = blocks.find((block: Block) => block.Type === 'equation')
    expect(equation).toMatchObject(expected)
  })

  it('resolves callout block', async () => {
    const expected: Block = {
      Id: '5d04be89-54da-482a-9391-efd465f74082',
      Type: 'callout',
      HasChildren: false,
      Callout: {
        RichTexts: [
          {
            Annotation: annotation,
            PlainText: 'Callout'
          }
        ],
        Icon: {
          Emoji: 'ℹ️',
        },
        Color: 'default',
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const callout = blocks.find((block: Block) => block.Type === 'callout')
    expect(callout).toMatchObject(expected)
  })

  it('resolves synced_block', async () => {
    const expected: Block = {
      Id: '6324dae5-1800-4be4-b914-dcb455d4125a',
      Type: 'synced_block',
      HasChildren: false,
      SyncedBlock: {
        SyncedFrom: {
          BlockId: '359244aa-d0bf-43a0-aa32-87a3afba908d',
        },
        Children: [
          {
            Id: 'e22fc940-85ac-4e94-a82e-17fdc75320c0',
            Type: 'paragraph',
            HasChildren: false,
            Paragraph: {
              RichTexts: [
                {
                  Annotation: annotation,
                  PlainText: 'Synced Block',
                }
              ],
              Color: 'default',
            },
          }
        ],
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const syncedBlock = blocks.find((block: Block) => block.Type === 'synced_block')
    expect(syncedBlock).toMatchObject(expected)
  })

  it('resolves toggle block', async () => {
    const expected: Block = {
      Id: 'b25cc629-df95-4ffb-adbe-a83aa0e13165',
      Type: 'toggle',
      HasChildren: true,
      Toggle: {
        RichTexts: [
          {
            Annotation: annotation,
            PlainText: 'Toggle'
          }
        ],
        Color: 'default',
        Children: [
          {
            Id: '36bf0deb-b96f-4a32-acda-56d6c18efd91',
            Type: 'paragraph',
            HasChildren: false,
            Paragraph: {
              RichTexts: [
                {
                  Annotation: annotation,
                  PlainText: 'Toggle',
                }
              ],
              Color: 'default',
            },
          }
        ],
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const toggle = blocks.find((block: Block) => block.Type === 'toggle')
    expect(toggle).toMatchObject(expected)
  })

  it('resolves embed block', async () => {
    const expected: Block = {
      Id: 'ad113064-8a5a-4c3f-92fa-0bf5cf50170c',
      Type: 'embed',
      HasChildren: false,
      Embed: {
        Url: 'https://website.domain',
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const embed = blocks.find((block: Block) => block.Type === 'embed')
    expect(embed).toMatchObject(expected)
  })

  it('resolves bookmark block', async () => {
    const expected: Block = {
      Id: '68d08dc9-1ee7-47e7-bd12-3c7f0c4f658f',
      Type: 'bookmark',
      HasChildren: false,
      Bookmark: {
        Url: 'https://website.domain',
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const bookmark = blocks.find((block: Block) => block.Type === 'bookmark')
    expect(bookmark).toMatchObject(expected)
  })

  it('resolves link_preview block', async () => {
    const expected: Block = {
      Id: '33df90cc-380c-43b0-87a0-c81f6f9060cb',
      Type: 'link_preview',
      HasChildren: false,
      LinkPreview: {
        Url: 'https://github.com/example/example-repo/pull/1234',
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const linkPreview = blocks.find((block: Block) => block.Type === 'link_preview')
    expect(linkPreview).toMatchObject(expected)
  })

  it('resolves table block', async () => {
    const expected: Block = {
      Id: '30f2f940-3bd8-46de-b76c-00e4c0eb9521',
      Type: 'table',
      HasChildren: true,
      Table: {
        TableWidth: 2,
        HasColumnHeader: true,
        HasRowHeader: false,
        Rows: [
          {
            Id: 'cd15219b-1b68-4adb-9a94-7b1e0b8feb53',
            Type: 'table_row',
            HasChildren: false,
            Cells: [
              {
                RichTexts: [
                  {
                    Annotation: annotation,
                    PlainText: 'A1',
                  }
                ],
              },
              {
                RichTexts: [
                  {
                    Annotation: annotation,
                    PlainText: 'B1',
                  }
                ],
              },
            ],
          },
          {
            Id: 'b319732e-013f-438d-ab9b-c4966a1a2530',
            Type: 'table_row',
            HasChildren: false,
            Cells: [
              {
                RichTexts: [
                  {
                    Annotation: annotation,
                    PlainText: 'A2',
                  }
                ],
              },
              {
                RichTexts: [
                  {
                    Annotation: annotation,
                    PlainText: 'B2',
                  }
                ],
              },
            ],
          },
        ],
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const table = blocks.find((block: Block) => block.Type === 'table')
    expect(table).toMatchObject(expected)
  })

  it('resolves column_list block', async () => {
    const expected: Block = {
      Id: 'fd07e26e-c0be-43df-be77-da87a5dcc986',
      Type: 'column_list',
      HasChildren: true,
      ColumnList: {
        Columns: [
          {
            Id: '8d87c82c-056f-425e-9dd6-a3998bbda4bb',
            Type: 'column',
            HasChildren: true,
            Children: [
              {
                Id: 'e4e135a3-afb9-4665-8c37-d10a00e57f57',
                Type: 'paragraph',
                HasChildren: false,
                Paragraph: {
                  RichTexts: [
                    {
                      Annotation: annotation,
                      PlainText: 'Column List',
                    }
                  ],
                  Color: 'default',
                },
              },
            ],
          },
        ],
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const columnList = blocks.find((block: Block) => block.Type === 'column_list')
    expect(columnList).toMatchObject(expected)
  })

  it('resolves table_of_contents block', async () => {
    const expected: Block = {
      Id: 'e9f13d8c-6872-4e64-8c66-dd621f0e2cfe',
      Type: 'table_of_contents',
      HasChildren: true,
      TableOfContents: {
        Color: 'default',
      },
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const tableOfContents = blocks.find((block: Block) => block.Type === 'table_of_contents')
    expect(tableOfContents).toMatchObject(expected)
  })

  it('resolves divider block', async () => {
    const expected: Block = {
      Id: '5d04be89-54da-482a-9391-efd465f74082',
      Type: 'divider',
      HasChildren: false,
    }

    const blocks = await getAllBlocksByBlockId(pageBlockId)
    const divider = blocks.find((block: Block) => block.Type === 'divider')
    expect(divider).toMatchObject(expected)
  })
})

describe('getAllTags', () => {
  it('resolved 1 tag', async () => {
    const tags = await getAllTags()
    expect(tags).toHaveLength(1)
  })

  it('resolved 1 tag', async () => {
    const tags = await getAllTags()
    expect(tags).toEqual(expect.arrayContaining(['Diary']))
  })
})

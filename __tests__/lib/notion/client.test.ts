jest.mock('../../../src/lib/notion/blog-index-cache')

import {
  getPosts,
  getAllBlocksByBlockId,
  getAllTags,
} from '../../../src/lib/notion/client'

import {
  Post,
} from '../../../src/lib/notion/interfaces'

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
  const pageBlockId = '"ed0090ef-628c-4cfd-a8ea-1a5326855f8a'
  const tableBlockId = '30f2f940-3bd8-46de-b76c-00e4c0eb9521'

  it('resolves 32 blocks', async () => {
    const got = await getAllBlocksByBlockId(pageBlockId)
    expect(got).toHaveLength(32)
  })

  it('resolves Rows in Table blocks', async () => {
    const got = await getAllBlocksByBlockId(pageBlockId)
    const tableBlock = got.filter(item => item.Type === 'table')[0]
    expect(tableBlock.Table).toHaveProperty('Rows')
  })

  it('resolves 4 Rows in Table blocks', async () => {
    const got = await getAllBlocksByBlockId(pageBlockId)
    const tableBlock = got.filter(item => item.Type === 'table')[0]
    expect(tableBlock.Table.Rows).toHaveLength(4)
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

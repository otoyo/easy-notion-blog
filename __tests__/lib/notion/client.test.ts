jest.mock('../../../src/lib/notion/blog-index-cache')

import {
  getPosts,
  getAllBlocksByBlockId,
  getAllTags,
} from '../../../src/lib/notion/client'

describe('getPosts', () => {
  it('resolves 3 posts', async () => {
    const got = await getPosts()
    expect(got).toHaveLength(3)
  })

  it('resolves 3 posts having PageId', async () => {
    const got = await getPosts()
    got.forEach(item => expect(item).toHaveProperty('PageId'))
  })

  it('resolves 3 posts having Slug', async () => {
    const got = await getPosts()
    got.forEach(item => expect(item).toHaveProperty('Slug'))
  })

  it('resolves 3 posts having Title', async () => {
    const got = await getPosts()
    got.forEach(item => expect(item).toHaveProperty('Title'))
  })

  it('resolves 3 posts having Date', async () => {
    const got = await getPosts()
    got.forEach(item => expect(item).toHaveProperty('Date'))
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
    const got = await getAllTags()
    expect(got).toHaveLength(1)
  })

  it('resolved 1 tag', async () => {
    const got = await getAllTags()
    expect(got).toEqual(expect.arrayContaining(['Diary']))
  })
})

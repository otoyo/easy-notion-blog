jest.mock('../../../src/lib/notion/blog-index-cache')

import { createMocks } from 'node-mocks-http'
import ApiBlocks from '../../../src/pages/api/blocks'

const slug = 'supported-blocks'

describe('/api/blocks', () => {
  describe('not GET', () => {
    test('returns 400', async () => {
      const { req, res } = createMocks({ method: 'POST', url: `/api/blocks?slug=${slug}` });

      await ApiBlocks(req, res)
      expect(res.statusCode).toEqual(400)
    })
  })

  describe('GET', () => {
    describe('empty slug', () => {
      test('returns 400', async () => {
        const { req, res } = createMocks({ method: 'GET', url: '/api/blocks?slug=' });

        await ApiBlocks(req, res)
        expect(res.statusCode).toEqual(400)
      })
    })

    describe('valid slug', () => {
      test('returns 400', async () => {
        const { req, res } = createMocks({ method: 'GET', url: `/api/blocks?slug=${slug}` });

        await ApiBlocks(req, res)
        expect(res.statusCode).toEqual(200)
      })
    })
  })
})

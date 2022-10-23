'use strict'

import * as fs from 'fs'
import * as path from 'path'

const client = jest.createMockFromModule('@notionhq/client')

client.Client = class {
  constructor() {
    return {
      databases: {
        query: () => {
          return JSON.parse(
            fs
              .readFileSync(
                path.resolve(
                  './__tests__/fixtures/notion-api-response-pages.json'
                )
              )
              .toString()
          )
        },
        retrieve: () => {
          return JSON.parse(
            fs
              .readFileSync(
                path.resolve(
                  './__tests__/fixtures/notion-api-response-database.json'
                )
              )
              .toString()
          )
        },
      },
      blocks: {
        children: {
          list: ({ block_id }) => {
            const blockIdToFilename = {
              '30f2f940-3bd8-46de-b76c-00e4c0eb9521': './__tests__/fixtures/notion-api-response-table-row-blocks.json',
              'fd07e26e-c0be-43df-be77-da87a5dcc986': './__tests__/fixtures/notion-api-response-columns.json',
              '8d87c82c-056f-425e-9dd6-a3998bbda4bb': './__tests__/fixtures/notion-api-response-column-blocks.json',
              'd3a36836-2e43-4d4d-a186-9b18bc86e6ff': './__tests__/fixtures/notion-api-response-bulleted-list-item-blocks.json',
              '4e28c935-0b09-48c3-b72c-169b7fc5dbdb': './__tests__/fixtures/notion-api-response-numbered-list-item-blocks.json',
              '04543c2a-b9f1-4fcc-8ff9-70196353c63a': './__tests__/fixtures/notion-api-response-to-do-blocks.json',
              '359244aa-d0bf-43a0-aa32-87a3afba908d': './__tests__/fixtures/notion-api-response-synced-block-children.json',
              'b25cc629-df95-4ffb-adbe-a83aa0e13165': './__tests__/fixtures/notion-api-response-toggle-blocks.json',
            }
            const filename = blockIdToFilename[block_id] || './__tests__/fixtures/notion-api-response-page-blocks.json'
            return JSON.parse(fs.readFileSync(path.resolve(filename)).toString())
          },
        },
        retrieve: ({ block_id }) => {
          if (block_id === '359244aa-d0bf-43a0-aa32-87a3afba908d') {
            return JSON.parse(fs.readFileSync(path.resolve('./__tests__/fixtures/notion-api-response-original-synced-block.json')).toString())
          }
          return {}
        },
      },
    }
  }
}

module.exports = client

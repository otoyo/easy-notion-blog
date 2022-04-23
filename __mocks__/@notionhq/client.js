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
            const tableBlockId = '30f2f940-3bd8-46de-b76c-00e4c0eb9521'
            const nestedBulletedListBlockId =
              'd3a36836-2e43-4d4d-a186-9b18bc86e6ff'
            const nestedNumberedListBlockId =
              '4e28c935-0b09-48c3-b72c-169b7fc5dbdb'

            if (block_id === tableBlockId) {
              return JSON.parse(
                fs
                  .readFileSync(
                    path.resolve(
                      './__tests__/fixtures/notion-api-response-table-row-blocks.json'
                    )
                  )
                  .toString()
              )
            } else if (block_id === nestedBulletedListBlockId) {
              return JSON.parse(
                fs
                  .readFileSync(
                    path.resolve(
                      './__tests__/fixtures/notion-api-response-bulleted-list-item-blocks.json'
                    )
                  )
                  .toString()
              )
            } else if (block_id === nestedNumberedListBlockId) {
              return JSON.parse(
                fs
                  .readFileSync(
                    path.resolve(
                      //'./__tests__/fixtures/notion-api-response-bulleted-list-item-blocks.json'
                      './__tests__/fixtures/notion-api-response-numbered-list-item-blocks.json'
                    )
                  )
                  .toString()
              )
            }

            return JSON.parse(
              fs
                .readFileSync(
                  path.resolve(
                    './__tests__/fixtures/notion-api-response-page-blocks.json'
                  )
                )
                .toString()
            )
          },
        },
      },
    }
  }
}

module.exports = client

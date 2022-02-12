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

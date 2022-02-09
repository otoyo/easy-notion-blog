const fs = require('fs')
const path = require('path')
const {
  NOTION_API_SECRET,
  DATABASE_ID,
} = require('./src/lib/notion/server-constants')

const warnOrError =
  process.env.NODE_ENV !== 'production'
    ? console.warn
    : msg => {
        throw new Error(msg)
      }

if (!NOTION_API_SECRET) {
  // We aren't able to build or serve images from Notion without the
  // NOTION_API_SECRET being populated
  warnOrError(
    `\nNOTION_API_SECRET is missing from env, this will result in an error\n` +
      `Make sure to provide one before starting Next.js`
  )
}

if (!DATABASE_ID) {
  // We aren't able to build or serve images from Notion without the
  // DATABASE_ID being populated
  warnOrError(
    `\nDATABASE_ID is missing from env, this will result in an error\n` +
      `Make sure to provide one before starting Next.js`
  )
}

module.exports = {
  target: 'experimental-serverless-trace',

  images: {
    domains: ['s3.us-west-2.amazonaws.com'],
  },
  async rewrites() {
    return [
      { source: '/atom', destination: '/api/atom' },
      { source: '/sitemap', destination: '/api/sitemap' },
    ]
  },

  outputFileTracing: false,
}

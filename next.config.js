const fs = require('fs')
const path = require('path')
const {
  NOTION_API_SECRET,
  DATABASE_ID,
} = require('./app/server-constants')

const warnOrError =
  process.env.NODE_ENV !== 'production' || process.env.GITHUB_ACTIONS
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
  images: {
    domains: ['s3.us-west-2.amazonaws.com', 'images.unsplash.com'],
  },

  outputFileTracing: false,

  experimental: {
    appDir: true,
  },
}

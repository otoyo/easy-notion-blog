import { NextApiRequest, NextApiResponse } from 'next'
import urlMetadata from 'url-metadata'

const ApiUrlMetadata = async function(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'GET') {
    res.statusCode = 400
    res.end()
    return
  }

  const { url } = req.query

  if (!url) {
    res.statusCode = 400
    res.end()
    return
  }

  try {
    new URL(url as string)
  } catch (e) {
    console.log(e)

    res.statusCode = 400
    res.end()
    return
  }

  try {
    const metadata = await urlMetadata(url as string)
    if (!metadata) {
      throw new Error(`no metadata. url: ${url}`)
    }

    const title = metadata['title'] || metadata['og:title']
    const description = metadata['description'] || metadata['og:description']
    const image = metadata['image'] || metadata['og:image']

    res.write(JSON.stringify({ title, description, image }))
    res.statusCode = 200
    res.end()
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end()
  }
}

export default ApiUrlMetadata

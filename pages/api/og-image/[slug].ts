import { NextApiRequest, NextApiResponse } from 'next'
import got from 'got'
import { getPostBySlug } from '../../../lib/notion/client'

const ApiOgImage = async function(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.statusCode = 400
    res.end()
    return
  }

  const { slug: slugs } = req.query

  if (!slugs) {
    res.statusCode = 400
    res.end()
    return
  }

  const slug = slugs.toString()

  try {
    const post = await getPostBySlug(slug)
    if (!post) {
      throw new Error(`post not found. slug: ${slug}`)
    }

    if (!post.OGImage) {
      res.statusCode = 404
      res.end()
      return
    }

    const { rawBody: image, headers: headers } = await got(post.OGImage)

    res.setHeader('Content-Type', headers['content-type'])
    res.setHeader('Cache-Control', 'public, s-maxage=86400, max-age=86400, stale-while-revalidate=86400')
    res.write(image)
    res.statusCode = 200
    res.end()
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end()
  }
}

export default ApiOgImage

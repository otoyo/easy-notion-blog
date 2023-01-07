import { NextApiRequest, NextApiResponse } from 'next'

import { getPostBySlug } from '../../../lib/notion/client'

const ApiPost = async function(req: NextApiRequest, res: NextApiResponse) {
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

    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({
      Title: post.Title,
      Slug: post.Slug,
      Date: post.Date,
      Tags: post.Tags,
      Excerpt: post.Excerpt,
      OGImage: post.OGImage,
    }))
    res.statusCode = 200
    res.end()
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end()
  }
}

export default ApiPost

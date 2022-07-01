import { NextApiRequest, NextApiResponse } from 'next'

import {
  getPostBySlug,
  getAllBlocksByBlockId,
} from '../../lib/notion/client'

const ApiBlocks = async function(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'GET') {
    res.statusCode = 400
    res.end()
    return
  }

  const { slug } = req.query

  if (!slug) {
    res.statusCode = 400
    res.end()
    return
  }

  try {
    const post = await getPostBySlug(slug as string)
    if (!post) {
      throw new Error(`post not found. slug: ${slug}`)
    }

    const blocks = await getAllBlocksByBlockId(post.PageId)

    res.write(JSON.stringify(blocks))
    res.statusCode = 200
    res.end()
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end()
  }
}

export default ApiBlocks

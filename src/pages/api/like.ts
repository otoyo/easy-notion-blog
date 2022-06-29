import { IncomingMessage, ServerResponse } from 'http'

import {
  getPostBySlug,
  incrementLikes,
} from '../../lib/notion/client'

const ApiBlogSlug = async function(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'PUT') {
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
    getPostBySlug(slug as string).then(post => {
      if (!post) {
        throw new Error(`post not found. slug: ${slug}`)
      }
      incrementLikes(post)
    })
    res.statusCode = 200
    res.end()
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end()
  }
}

export default ApiBlogSlug

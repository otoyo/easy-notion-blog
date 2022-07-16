import { NextApiRequest, NextApiResponse } from 'next'

import {
  getPostBySlug,
  incrementLikes,
} from '../../lib/notion/client'

const ApiBlogSlug = async function(req: NextApiRequest, res: NextApiResponse) {
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

  getPostBySlug(slug as string)
    .then(post => {
      if (!post) throw new Error(`post not found. slug: ${slug}`)
      return post
    })
    .then(post => incrementLikes(post))
    .then(() => {
      res.statusCode = 200
      res.end()
    })
    .catch(e => {
      console.log(e)
      res.statusCode = 500
      res.end()
    })
}

export default ApiBlogSlug

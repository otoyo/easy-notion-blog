import { NextApiRequest, NextApiResponse } from 'next'

import { getBlock } from '../../../lib/notion/client'

const ApiBlock = async function(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.statusCode = 400
    res.end()
    return
  }

  const { id: ids } = req.query

  if (!ids) {
    res.statusCode = 400
    res.end()
    return
  }

  const id = ids.toString()

  try {
    const block = await getBlock(id)

    if (block.Type !== 'image') {
      res.statusCode = 404
      res.end()
      return
    }

    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(block))
    res.statusCode = 200
    res.end()
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end()
  }
}

export default ApiBlock

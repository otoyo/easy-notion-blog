'use client'

import React from 'react'
import useSWR from "swr"
import axios from 'axios'
import { Block } from '../../lib/notion/interfaces'
import styles from '../../styles/blog.module.css'

const fetchBlock = async (blockId: string): Promise<Block> => {
  try {
    const { data: block } = await axios.get(`/api/blocks/${blockId}`)
    return block as Block
  } catch (error) {
    console.log(error)
  }
}

const isExpired = (block: Block): boolean => {
  const now = Date.now()

  if (block.Type === 'image') {
    const image = block.Image
    if (image.File && image.File.ExpiryTime && Date.parse(image.File.ExpiryTime) < now) {
      return true
    }
  }
  return false
}

const ImageBlock = ({ block: initialBlock }) => {
  const { data: block } = useSWR(isExpired(initialBlock) && initialBlock.Id, fetchBlock, { fallbackData: initialBlock })

  return (
    <figure className={styles.image}>
      <div>
        <img
          src={
            block.Image.External
              ? block.Image.External.Url
              : block.Image.File.Url
          }
          alt="image block"
        />
      </div>
      {block.Image.Caption.length > 0 && block.Image.Caption[0].Text.Content ? (
        <figcaption className={styles.caption}>
          {block.Image.Caption[0].Text.Content}
        </figcaption>
      ) : null}
    </figure>
  )
}

export default ImageBlock

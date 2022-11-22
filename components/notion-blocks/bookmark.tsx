'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from '../../styles/notion-block.module.css'

interface Metadata {
  title: string | null
  description: string | null
  image: string | null
}

const Bookmark = ({ block }) => {
  let sURL: string | null
  if (block.Bookmark) {
    sURL = block.Bookmark.Url
  } else if (block.LinkPreview) {
    sURL = block.LinkPreview.Url
  } else if (block.Embed) {
    sURL = block.Embed.Url
  }

  const [metadata, setMetadata] = useState<Metadata | null>()

  useEffect(() => {
    try {
      const url = new URL(sURL)
      axios.get(`/api/url-metadata?url=${url.toString()}`)
        .then((res) => {
          setMetadata(res.data as Metadata)
        })
    } catch (e) {
      console.log(e)
    }
  }, [sURL])

  let url: URL
  try {
    url = new URL(sURL)
  } catch (e) {
    console.log(e)
  }

  if (!metadata || !url) {
    return <></>
  }

  const { title, description, image } = metadata

  return (
    <div className={styles.bookmark}>
      <a href={url.toString()} target="_blank" rel="noopener noreferrer">
        <div>
          <div>{title ? title : ''}</div>
          <div>{description ? description : ''}</div>
          <div>
            <div>
              <img src={`https://www.google.com/s2/favicons?domain=${url.hostname}`} alt="title" loading="lazy" decoding="async" />
            </div>
            <div>{url.origin}</div>
          </div>
        </div>
        <div>
          {image
            ? <img src={image} alt="title" loading="lazy" decoding="async" />
            : null
          }
        </div>
      </a>
    </div>
  )
}

export default Bookmark

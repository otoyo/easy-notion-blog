'use client'

import React from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { isYouTubeURL, parseYouTubeVideoId } from '../../lib/blog-helpers'

import styles from '../../styles/notion-block.module.css'

const Video = ({ block }) => {
  let url: URL
  try {
    url = new URL(block.Video.External.Url)
  } catch {
    return null
  }

  if (!isYouTubeURL(url)) {
    return null
  }

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo()
  }
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  }

  const videoId = parseYouTubeVideoId(url)
  if (videoId === '') {
    return null
  }

  return (
    <div className={styles.video}>
      <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} className={styles.youtube} />
    </div>
  )
}

export default Video

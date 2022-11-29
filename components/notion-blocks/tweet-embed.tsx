'use client'

import { TwitterTweetEmbed } from 'react-twitter-embed'

import styles from '../../styles/notion-block.module.css'

const TweetEmbed = ({ url }) => {
  let matched: Array<string>
  try {
    matched = new URL(url).pathname.match(/\/(\d+)$/)
  } catch (error) {
    console.log(error)
    return null
  }

  if (!matched) {
    return null
  }

  return (
    <div className={styles.tweetEmbed}>
      <TwitterTweetEmbed tweetId={matched[1]} />
    </div>
  )
}

export default TweetEmbed

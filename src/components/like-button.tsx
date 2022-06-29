import React, { useState } from 'react';

import * as gtag from '../lib/gtag'

import styles from '../styles/like-button.module.css'
import Heart from './svgs/heart'

type Props = {
  id: string
}

const LikeButton = (props: Props) => {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    if (!active) {
      gtag.like({
        contentType: 'article',
        itemId: props.id,
      })
      setActive(true)
    }
  }

  return (
    <button className={styles.likeButton} onClick={handleClick}>
      <Heart width={32} height={32} active={active} />
    </button>
  )
}

export default LikeButton

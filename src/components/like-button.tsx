import React, { useState } from 'react';
import axios from 'axios'

import styles from '../styles/like-button.module.css'
import Heart from './svgs/heart'

type Props = {
  id: string
}

const LikeButton = (props: Props) => {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    if (!active) {
      axios.put(`/api/like?slug=${props.id}`, {})
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

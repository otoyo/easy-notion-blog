import YouTube from 'react-youtube';

import styles from '../../styles/notion-block.module.css'

const Video=({url}) => {
    let matched
    try {
        matched = new URL(url).pathname.match(/\/(\w+)$/)
    } catch (error) {
        console.log(error)
        return (
            <>
            <p>マッチできていません</p>
            </>
        )
    }

    if (!matched) {
        return null
    }

  return (
   <div className={styles.Video}>
    <YouTube videoId={matched[1]} />
   </div> 
  );
}

export default Video;
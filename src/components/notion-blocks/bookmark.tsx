import { LinkPreview } from '@dhaiwat10/react-link-preview'
import { NEXT_PUBLIC_URL } from '../../lib/notion/server-constants'
import styles from '../../styles/notion-block.module.css'

const Bookmark = ({ block }) => {
  const url = block.Bookmark ? block.Bookmark.Url : block.LinkPreview.Url
  // {new URL('/error.jpg', NEXT_PUBLIC_URL).toString()}
  return (
    <LinkPreview
      url={url}
      className={styles.linkPreview}
      fallbackImageSrc={new URL('/error.png', NEXT_PUBLIC_URL).toString()}
      backgroundColor="#f7ebe1"
      // fallbackImageSrc="https://herohoro.com/default.png"
      // imageHeight='20vh'
      borderColor='#8c8676'
      descriptionLength={60}
      
    />
  )
}

export default Bookmark

import { LinkPreview } from '@dhaiwat10/react-link-preview'

import styles from '../../styles/notion-block.module.css'

const Bookmark = ({ block }) => {
  const url = block.Bookmark ? block.Bookmark.Url : block.LinkPreview.Url

  return (
    <LinkPreview
      url={url}
      className={styles.linkPreview}
      descriptionLength={60}
    />
  )
}

export default Bookmark

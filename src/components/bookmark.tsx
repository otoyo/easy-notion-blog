import { LinkPreview } from '@dhaiwat10/react-link-preview'
import blogStyles from '../styles/blog.module.css'

const Bookmark = ({ url }) => {
  try {
    new URL(url)
  } catch (error) {
    console.log(error)
    return <></>
  }

  return (
    <>
      <LinkPreview url={url} className={blogStyles.linkPreview} />
    </>
  )
}

export default Bookmark

import { LinkPreview } from '@dhaiwat10/react-link-preview'
import { NEXT_PUBLIC_URL } from '../../lib/notion/server-constants'
import styles from '../../styles/notion-block.module.css'
import Link from 'next/link'

const Bookmark = ({ block }) => {
  const url = block.Bookmark ? block.Bookmark.Url : block.LinkPreview.Url
  // {new URL('/error.jpg', NEXT_PUBLIC_URL).toString()}
  const result = url.indexOf(NEXT_PUBLIC_URL.toString())
  
    if(result !== -1){
      // 見つかった時
      return (
        <div className={styles.MylinkPreview}>
          <Link href={url.toString()} passHref >
            <p>へろほろブログの記事はこちら</p>
          </Link>
        </div>
      // url={url}
      // className={styles.MylinkPreview}
      // fallbackImageSrc={new URL('/error.png', NEXT_PUBLIC_URL).toString()}
      // backgroundColor="#d5d1ed"
      // fallbackImageSrc="https://herohoro.com/default.png"
      // imageHeight='120wh'
      
      // borderColor='#8c8676'
      // descriptionLength={60}
      
    
      )
    }
    else{
      return(
      <LinkPreview
      url={url}
      className={styles.linkPreview}
      fallbackImageSrc={new URL('/error.png', NEXT_PUBLIC_URL).toString()}
      backgroundColor="#f7ebe1"
      // fallbackImageSrc="https://herohoro.com/default.png"
      imageHeight='100wh'
      
      borderColor='#8c8676'
      descriptionLength={60}
      
    /> 
  )
 }
}

export default Bookmark

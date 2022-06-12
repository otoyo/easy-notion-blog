import dynamic from 'next/dynamic'

import styles from '../../styles/notion-block.module.css'

const TweetEmbed = dynamic(() => import('./tweet-embed'))
const Video = dynamic(() => import('./video'))
const LinkPreview = dynamic(() =>
  import('@dhaiwat10/react-link-preview').then(m => m.LinkPreview)
)

const Embed = ({ block }) => {
  if (/^https:\/\/twitter\.com/.test(block.Embed.Url)) {
    return <TweetEmbed url={block.Embed.Url} />
  } else if (/^https:\/\/www\.youtube\.com/.test(block.Embed.Url)) {
    return <Video url={block.Embed.Url} />
  } else if (/^https:\/\/gist\.github\.com/.test(block.Embed.Url)) {
    return <LinkPreview url={block.Embed.Url} className={styles.linkPreview} />
  }

  return (
    <div>
    <p>embedコンポ上でキャッチできなかったの</p>
    </div>
  )
}

export default Embed

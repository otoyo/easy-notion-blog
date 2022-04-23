import dynamic from 'next/dynamic'

import styles from '../../styles/notion-block.module.css'

const TweetEmbed = dynamic(() => import('./tweet-embed'))
const LinkPreview = dynamic(() =>
  import('@dhaiwat10/react-link-preview').then(m => m.LinkPreview)
)

const Embed = ({ block }) => {
  if (/^https:\/\/twitter\.com/.test(block.Embed.Url)) {
    return <TweetEmbed url={block.Embed.Url} />
  } else if (/^https:\/\/gist\.github\.com/.test(block.Embed.Url)) {
    return <LinkPreview url={block.Embed.Url} className={styles.linkPreview} />
  }

  return null
}

export default Embed

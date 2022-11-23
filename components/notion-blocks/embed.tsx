import dynamic from 'next/dynamic'

const TweetEmbed = dynamic(() => import('./tweet-embed'))
const Bookmark = dynamic(() => import('./bookmark'))

const Embed = ({ block }) => {
  if (/^https:\/\/twitter\.com/.test(block.Embed.Url)) {
    return <TweetEmbed url={block.Embed.Url} />
  } else if (/^https:\/\/gist\.github\.com/.test(block.Embed.Url)) {
    return <Bookmark block={block} />
  }

  return null
}

export default Embed

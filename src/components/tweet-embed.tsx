import { TwitterTweetEmbed } from 'react-twitter-embed'

const TweetEmbed = ({ url }) => {
  let matched
  try {
    matched = new URL(url).pathname.match(/\/(\d+)$/)
  } catch (error) {
    console.log(error)
    return <></>
  }

  if (!matched) {
    return <></>
  }

  return (
    <>
      <TwitterTweetEmbed tweetId={matched[1]} />
    </>
  )
}

export default TweetEmbed

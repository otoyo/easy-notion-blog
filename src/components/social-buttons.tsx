import {
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  PocketIcon,
  PocketShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

import * as gtag from '../lib/gtag'

const bgStyle = {
  fill: '#000000',
}

const SocialButtons = ({ title = '', url, id = null }) => (
  <ul>
    <li>
      <TwitterShareButton
        url={url}
        title={title}
        beforeOnClick={() =>
          gtag.share({
            method: 'twitter',
            contentType: 'article',
            itemId: id,
          })
        }
      >
        <TwitterIcon size={32} round={false} bgStyle={bgStyle} iconFillColor='white' />
      </TwitterShareButton>
    </li>
    <li>
      <FacebookShareButton
        url={url}
        beforeOnClick={() =>
          gtag.share({
            method: 'facebook',
            contentType: 'article',
            itemId: id,
          })
        }
      >
        <FacebookIcon size={32} round={false} bgStyle={bgStyle} iconFillColor='white' />
      </FacebookShareButton>
    </li>
    <li>
      <PocketShareButton
        url={url}
        title={title}
        beforeOnClick={() =>
          gtag.share({
            method: 'pocket',
            contentType: 'article',
            itemId: id,
          })
        }
      >
        <PocketIcon size={32} round={false} bgStyle={bgStyle} iconFillColor='white' />
      </PocketShareButton>
    </li>
    <li>
      <HatenaShareButton
        url={url}
        title={title}
        beforeOnClick={() =>
          gtag.share({
            method: 'hatena',
            contentType: 'article',
            itemId: id,
          })
        }
      >
        <HatenaIcon size={32} round={false} bgStyle={bgStyle} iconFillColor='white' />
      </HatenaShareButton>
    </li>
  </ul>
)

export default SocialButtons

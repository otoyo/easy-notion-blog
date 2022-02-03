import Head from 'next/head'
import { useRouter } from 'next/router'

import { NEXT_PUBLIC_URL } from '../lib/notion/server-constants'

export const SITE_TITLE = 'herohoroブログ'
export const SITE_DESCRIPTION =
  'Easy to start your blog. You can write on your Notion.'

const DocumentHead = ({
  title = 'herohoroブログ',
  description = 'This Notion Blog is powered by otoyo/easy-notion-blog',
  urlOgImage = 'https://easy-notion-blog-02.vercel.app/hero-room.jpg',
}) => {
  const { asPath, pathname } = useRouter()

  const currentURL = new URL(asPath, NEXT_PUBLIC_URL)

  return (
    <Head>
      <title>{title ? `${title} - ${SITE_TITLE}` : SITE_TITLE}</title>
      <meta
        name="description"
        content={description ? description : SITE_DESCRIPTION}
      />
      <meta property="og:url" content={currentURL.toString()} />
      <meta property="og:title" content={title ? title : SITE_TITLE} />
      <meta
        property="og:description"
        content={description ? description : SITE_DESCRIPTION}
      />
      {urlOgImage ? <meta property="og:image" content={urlOgImage} /> : null}
      <meta
        name="twitter:card"
        content={
          pathname === '/blog/[slug]' && urlOgImage
            ? 'summary_large_image'
            : 'summary'
        }
      />
      {urlOgImage ? <meta name="twitter:image" content={urlOgImage} /> : null}
      <link rel="canonical" href={currentURL.toString()} />
    </Head>
  )
}

export default DocumentHead

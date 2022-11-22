import Head from 'next/head'
import { useRouter } from 'next/router'

import { NEXT_PUBLIC_URL } from '../lib/notion/server-constants'

export const SITE_TITLE = 'easy-notion-blog'
export const SITE_DESCRIPTION =
  'Easy to start your blog. You can write on your Notion.'

const DocumentHead = ({ title = '', description = '', urlOgImage = '' }) => {
  const { asPath } = useRouter()

  return (
    <Head>
      <title>{title ? `${title} - ${SITE_TITLE}` : SITE_TITLE}</title>
      <meta
        name="description"
        content={description ? description : SITE_DESCRIPTION}
      />
      {NEXT_PUBLIC_URL ? (
        <meta
          property="og:url"
          content={new URL(asPath, NEXT_PUBLIC_URL).toString()}
        />
      ) : null}
      <meta property="og:title" content={title ? title : SITE_TITLE} />
      <meta
        property="og:description"
        content={description ? description : SITE_DESCRIPTION}
      />
      {urlOgImage ? (
        <meta property="og:image" content={urlOgImage} />
      ) : NEXT_PUBLIC_URL ? (
        <meta
          property="og:image"
          content={new URL('/default.png', NEXT_PUBLIC_URL).toString()}
        />
      ) : null}
      <meta name="twitter:card" content="summary_large_image" />
      {urlOgImage ? (
        <meta name="twitter:image" content={urlOgImage} />
      ) : NEXT_PUBLIC_URL ? (
        <meta
          name="twitter:image"
          content={new URL('/default.png', NEXT_PUBLIC_URL).toString()}
        />
      ) : null}
      {NEXT_PUBLIC_URL ? (
        <link
          rel="canonical"
          href={new URL(asPath, NEXT_PUBLIC_URL).toString()}
        />
      ) : null}
    </Head>
  )
}

export default DocumentHead

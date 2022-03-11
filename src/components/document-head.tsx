import Head from 'next/head'
import { useRouter } from 'next/router'

import { NEXT_PUBLIC_URL } from '../lib/notion/server-constants'

export const SITE_TITLE = 'herohoroブログ'
export const SITE_DESCRIPTION =
  '非エンジニアがeasy-notion-blogを通して勉強しながらスキルアップをしていくブログ'

const DocumentHead = ({ title = '', description = '', urlOgImage = '' }) => {
  const { asPath, pathname } = useRouter()
  const currentURL = new URL(asPath, NEXT_PUBLIC_URL)
  const defaultImageURL = new URL('/hero-room.jpeg', NEXT_PUBLIC_URL)

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
      <meta
        property="og:image"
        content={urlOgImage ? urlOgImage : defaultImageURL.toString()}
      />
      {/* {urlOgImage ? <meta property="og:image" content={urlOgImage} /> : null} */}
      <meta name="twitter:site" content="@mineral_30" />
      <meta
        name="twitter:card"
        content={
          pathname === '/blog/[slug]' && urlOgImage
            ? 'summary_large_image'
            : 'summary'
        }
      />
      <meta
        name="twitter:image"
        content={urlOgImage ? urlOgImage : defaultImageURL.toString()}
      />

      <link rel="canonical" href={currentURL.toString()} />

      {/* ## これは何だ？(▼ 参照commit)
      https://github.com/otoyo/notion-blog/blob/93213ddbaea359e5177e4ef18bab4c047e20444d/src/components/document-head.tsx#L44
      <link
        rel="alternate"
        type="application/atom+xml"
        href="/atom"
        title="アルパカログのフィード"
      /> */}
    </Head>
  )
}

export default DocumentHead

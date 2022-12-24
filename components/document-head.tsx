import {
  NEXT_PUBLIC_URL,
  NEXT_PUBLIC_SITE_TITLE,
  NEXT_PUBLIC_SITE_DESCRIPTION,
} from '../app/server-constants'

const DocumentHead = ({ title = '', description = '', path = '', urlOgImage = '' }) => {
  const elements = path.split('/')
  const isSlugPath = elements[0] === '' && elements[1] === 'blog' && elements.length === 3
  const isRootPath = path === '' || path === '/'

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="max-image-preview:large" />
      <meta charSet="utf-8" />
      <title>{title ? `${title} - ${NEXT_PUBLIC_SITE_TITLE}` : NEXT_PUBLIC_SITE_TITLE}</title>
      {NEXT_PUBLIC_URL ? (
        <link
          rel="canonical"
          href={new URL(path, NEXT_PUBLIC_URL).toString()}
        />
      ) : null}
      <meta itemProp="name" content={title ? `${title} - ${NEXT_PUBLIC_SITE_TITLE}` : NEXT_PUBLIC_SITE_TITLE} />
      {urlOgImage ? (
        <meta itemProp="image" content={urlOgImage} />
      ) : NEXT_PUBLIC_URL ? (
        <meta
          itemProp="image"
          content={new URL('/default.png', NEXT_PUBLIC_URL).toString()}
        />
      ) : null}
      <meta
        name="description"
        content={description ? description : NEXT_PUBLIC_SITE_DESCRIPTION}
      />
      {NEXT_PUBLIC_URL ? (
        <meta
          property="og:url"
          content={new URL(path, NEXT_PUBLIC_URL).toString()}
        />
      ) : null}
      <meta property="og:title" content={title ? title : NEXT_PUBLIC_SITE_TITLE} />
      <meta
        property="og:description"
        content={description ? description : NEXT_PUBLIC_SITE_DESCRIPTION}
      />
      <meta property="og:site_name" content={NEXT_PUBLIC_SITE_TITLE} />
      <meta property="og:type" content={
          isRootPath
          ? 'website'
          : isSlugPath
            ? 'article'
        : 'blog'
      } />
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
      <meta name="twitter:title" content={title ? `${title} - ${NEXT_PUBLIC_SITE_TITLE}` : NEXT_PUBLIC_SITE_TITLE} />
      <meta
        name="twitter:description"
        content={description ? description : NEXT_PUBLIC_SITE_DESCRIPTION}
      />
    </>
  )
}

export default DocumentHead

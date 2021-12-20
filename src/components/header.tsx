import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import ExtLink from './ext-link'
import styles from '../styles/header.module.css'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Home', page: '/' },
  { label: 'Blog', page: '/blog' },
]
const defaultUrl = 'https://easy-notion-blog-02.vercel.app'
const defaultTitle = 'herohoroブログ'
const defaultOgImageUrl = 'https://easy-notion-blog-02.vercel.app/hero-room.jpg'
const defaultDescription =
  'This Notion Blog is powered by otoyo/easy-notion-blog'

const Header = ({
  path = '',
  titlePre = '',
  description = '',
  ogImageUrl = '',
}) => {
  const { pathname } = useRouter()

  return (
    <header className={styles.header}>
      <Head>
        <title>
          {!titlePre ? defaultTitle : `${titlePre} - ${defaultTitle}`}
        </title>
        <meta
          name="description"
          content={!description ? defaultDescription : description}
        />
        <meta
          property="og:title"
          content={!titlePre ? defaultTitle : titlePre}
        />
        <meta
          property="og:description"
          content={!description ? defaultDescription : description}
        />

        <meta
          property="og:image"
          content={ogImageUrl ? ogImageUrl : defaultOgImageUrl}
        />
        <meta
          property="twitter:image"
          content={ogImageUrl ? ogImageUrl : defaultOgImageUrl}
        />
        <meta
          name="twitter:card"
          content={!ogImageUrl ? 'summary' : 'summary_large_image'}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          href="/atom"
          title={defaultTitle}
        />
      </Head>
      <p>
        ⭐このブログを便利に使う方法は
        <Link href="https://sparkling-cinnamon-3f9.notion.site/herohoro-48ff806d05484215b51b9dc79df15357">
          こちら
        </Link>
        で解説してます⭐
      </p>
      <h1>
        <Link href="/" passHref>
          <a>{defaultTitle}</a>
        </Link>
      </h1>
      <p>
        easy-notion-blog導入に関する記事は
        <Link href="https://easy-notion-blog-02.vercel.app/blog/tag/easy-notion-blog_%E4%BA%8B%E5%A7%8B%E3%82%81">
          こちら
        </Link>
        をご覧ください
      </p>
      <ul>
        {navItems.map(({ label, page, link }) => (
          <li key={label}>
            {page ? (
              <Link href={page} passHref>
                <a className={pathname === page ? 'active' : undefined}>
                  {label}
                </a>
              </Link>
            ) : (
              <ExtLink href={link}>{label}</ExtLink>
            )}
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header

import Link from 'next/link'
import { useRouter } from 'next/router'

import { NEXT_PUBLIC_URL } from '../lib/notion/server-constants'

import { SITE_TITLE } from './document-head'
import styles from '../styles/header.module.css'

interface NavItem {
  label: string
  path: string
}

const Header = () => {
  const { asPath } = useRouter()
  const url = new URL(asPath, NEXT_PUBLIC_URL)

  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
  ]

  return (
    <header className={styles.header}>
      <p>
        <Link href="https://sparkling-cinnamon-3f9.notion.site/herohoro-48ff806d05484215b51b9dc79df15357">
          ⭐このブログを便利に使う方法⭐
        </Link>
      </p>
      <h1>
        <Link href="/" passHref>
          <a>{SITE_TITLE}</a>
        </Link>
      </h1>
      <p>
        <Link href="https://easy-notion-blog-02.vercel.app/blog/tag/easy-notion-blog_%E4%BA%8B%E5%A7%8B%E3%82%81">
          ⭐easy-notion-blog導入⭐
        </Link>
      </p>
      <ul>
        {navItems.map(({ label, path }) => (
          <li key={label}>
            <Link href={path} passHref>
              <a className={url.pathname === path ? 'active' : null}>{label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header

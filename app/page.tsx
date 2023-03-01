import type { Metadata } from 'next'
import Link from 'next/link'
import {
  NEXT_PUBLIC_URL,
  NEXT_PUBLIC_SITE_TITLE,
  NEXT_PUBLIC_SITE_DESCRIPTION
} from './server-constants'
import GoogleAnalytics from '../components/google-analytics'
import styles from '../styles/page.module.css'

export async function generateMetadata(): Promise<Metadata> {
  const title = NEXT_PUBLIC_SITE_TITLE
  const description = NEXT_PUBLIC_SITE_DESCRIPTION
  const url = NEXT_PUBLIC_URL ? new URL(NEXT_PUBLIC_URL) : undefined
  const images = NEXT_PUBLIC_URL ? [{ url: new URL('/default.png', NEXT_PUBLIC_URL) }] : []

  const metadata: Metadata = {
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: title,
      type: 'website',
      images: images,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: images,
    },
    alternates: {
      canonical: url,
    },
  }

  return metadata
}

const RootPage = () => (
  <>
    <GoogleAnalytics pageTitle={NEXT_PUBLIC_SITE_TITLE} />
    <div className={styles.container}>
      <div>
        <h2>Welcome!</h2>
        <p>Your easy-notion-blog deployed successfully!</p>
        <p>Have fun!</p>
        <p>
          easy-notion-blog powered by{' '}
          <Link href="https://github.com/otoyo/easy-notion-blog">
            otoyo/easy-notion-blog
          </Link>
        </p>
      </div>
    </div>
  </>
)

export default RootPage

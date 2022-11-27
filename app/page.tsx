import Link from 'next/link'
import { NEXT_PUBLIC_SITE_TITLE } from './server-constants'
import GoogleAnalytics from '../components/google-analytics'
import styles from '../styles/page.module.css'

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

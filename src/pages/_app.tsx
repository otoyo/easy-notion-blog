import '../styles/global.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import * as gtag from '../lib/gtag'
import Header from '../components/header'
import Footer from '../components/footer'
import GoogleAnalytics from '../components/google-analytics'

import '../styles/syntax-coloring.css'
import styles from '../styles/shared.module.css'

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (location.host !== 'localhost') {
        gtag.pageview(pageProps.title, url)
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, pageProps.title])

  return (
    <>
      <GoogleAnalytics />
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App

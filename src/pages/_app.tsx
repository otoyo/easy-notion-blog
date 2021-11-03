import '../styles/global.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import * as gtag from '../lib/gtag'
import Footer from '../components/footer'
import GoogleAnalytics from '../components/google-analytics'

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = url => {
      if (location.host !== 'localhost') {
        gtag.pageview(pageProps.title, url)
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <GoogleAnalytics />
      <div className="container">
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  )
}

export default App

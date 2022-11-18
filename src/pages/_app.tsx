//import '../styles/global.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { AnimatePresence } from 'framer-motion'

import * as gtag from 'lib/gtag'
import GoogleAnalytics from 'components/google-analytics'
import { MenuFlagProvider } from 'providers/MenuFlagProvider'

// import '../styles/syntax-coloring.css'
// import styles from '../styles/shared.module.css'

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
      <MenuFlagProvider>
        <GoogleAnalytics />
        <AnimatePresence exitBeforeEnter onExitComplete={() => window.scrollTo(0, 0)}>
          <Component {...pageProps} />
        </AnimatePresence>
      </MenuFlagProvider>
    </>
  )
}

export default App

'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from "next/navigation"
import Script from 'next/script'
import * as gtag from '../lib/gtag'
import { NEXT_PUBLIC_GA_TRACKING_ID } from '../app/server-constants'

const GoogleAnalytics = ({ pageTitle }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (location.host !== 'localhost') {
      gtag.pageview(pageTitle, pathname + searchParams.toString())
    }
  }, [pathname, searchParams, pageTitle])

  if (!NEXT_PUBLIC_GA_TRACKING_ID) {
    return null
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga" defer strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${NEXT_PUBLIC_GA_TRACKING_ID}', { page_path: window.location.pathname });
          `}
      </Script>
    </>
  )
}

export default GoogleAnalytics

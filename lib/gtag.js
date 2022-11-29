import { NEXT_PUBLIC_GA_TRACKING_ID } from '../app/server-constants'

// https://developers.google.com/analytics/devguides/migration/measurement/virtual-pageviews
export const pageview = (title, url) => {
  if (!NEXT_PUBLIC_GA_TRACKING_ID) {
    return
  }

  window.gtag('config', NEXT_PUBLIC_GA_TRACKING_ID, {
    page_title: title,
    page_location: url,
  })
}

// https://developers.google.com/gtagjs/reference/ga4-events
export const share = ({ method, contentType, itemId = null }) => {
  if (!NEXT_PUBLIC_GA_TRACKING_ID) {
    return
  }

  window.gtag('event', 'share', {
    method: method,
    content_type: contentType,
    item_id: itemId,
  })
}

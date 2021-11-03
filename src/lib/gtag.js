export const GA_TRACKING_ID = '' // Place your tracking ID

// https://developers.google.com/analytics/devguides/migration/measurement/virtual-pageviews
export const pageview = (title, url) => {
  if (!GA_TRACKING_ID) {
    return
  }

  window.gtag('config', GA_TRACKING_ID, {
    page_title: title,
    page_location: url,
  })
}

// https://developers.google.com/gtagjs/reference/ga4-events
export const share = ({ method, contentType, itemId = null }) => {
  if (!GA_TRACKING_ID) {
    return
  }

  window.gtag('event', 'share', {
    method: method,
    content_type: contentType,
    item_id: itemId,
  })
}

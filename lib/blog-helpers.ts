export const getBlogLink = (slug: string) => {
  return `/blog/${slug}`
}

export const getTagLink = (tag: string) => {
  return `/blog/tag/${encodeURIComponent(tag)}`
}

export const getBeforeLink = (date: string) => {
  return `/blog/before/${date}`
}

export const getTagBeforeLink = (tag: string, date: string) => {
  return `/blog/tag/${encodeURIComponent(tag)}/before/${date}`
}

export const getDateStr = (date: string) => {
  const dt = new Date(date)

  if(date.indexOf('T') !== -1){
    // Consider timezone
    const elements = date.split('T')[1].split(/([+-])/)
    if (elements.length > 1) {
      const diff = parseInt(`${elements[1]}${elements[2]}`, 10)
      dt.setHours(dt.getHours() + diff)
    }
  }

  const y = dt.getFullYear()
  const m = ('00' + (dt.getMonth() + 1)).slice(-2)
  const d = ('00' + dt.getDate()).slice(-2)
  return y + '-' + m + '-' + d
}

export const normalizeSlug = (slug: string) => {
  const startingSlash = slug.startsWith('/')
  const endingSlash = slug.endsWith('/')

  if (startingSlash) {
    slug = slug.substring(1)
  }
  if (endingSlash) {
    slug = slug.substring(0, slug.length - 1)
  }
  return startingSlash || endingSlash ? normalizeSlug(slug) : slug
}

export const isYouTubeURL = (url: URL): boolean => {
  if (['www.youtube.com', 'youtu.be'].includes(url.hostname)) {
    return true
  }
  return false
}

// Supported URL
//
// - http://youtu.be/0zM3nApSvMg
// - http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
// - http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
// - http://www.youtube.com/watch?v=0zM3nApSvMg
// - http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
// - http://www.youtube.com/embed/0zM3nApSvMg?rel=0
export const parseYouTubeVideoId = (url: URL): string => {
  if (!isYouTubeURL(url)) return ''

  if (url.hostname === 'youtu.be') {
    return url.pathname.split('/')[1]
  } else if (url.pathname === '/watch') {
    return url.searchParams.get('v')
  } else {
    const elements = url.pathname.split('/')

    if (elements.length < 2) return ''

    if (elements[1] === 'v' || elements[1] === 'embed') {
      return elements[2]
    }
  }

  return ''
}

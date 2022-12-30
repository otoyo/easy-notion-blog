jest.mock('../../lib/notion/blog-index-cache')

import {
  getDateStr,
  isYouTubeURL,
  parseYouTubeVideoId,
} from '../../lib/blog-helpers'

describe('getDateStr', () => {
  it('returns str when date has time', async () => {
    const got = getDateStr('2022-12-30T00:09:00.000+09:00')
    expect(got).toEqual('2022-12-30')
  })

  it('returns str when date has no time', async () => {
    const got = getDateStr('2022-12-30')
    expect(got).toEqual('2022-12-30')
  })

  it('returns local time str considering timezone', async () => {
    const got = getDateStr('2022-12-30T00:00:00.000+09:00')
    expect(got).toEqual('2022-12-30')
  })
})

describe('isYouTubeURL', () => {
  it('returns false with not YouTube URL', async () => {
    const got = isYouTubeURL(new URL('https://www.google.com/'))
    expect(got).toBeFalsy()
  })

  it('returns true with youtu.be', async () => {
    const got = isYouTubeURL(new URL('http://youtu.be/0zM3nApSvMg'))
    expect(got).toBeTruthy
  })

  it('returns true with www.youtube.com', async () => {
    const got = isYouTubeURL(new URL('http://www.youtube.com/watch?v=0zM3nApSvMg'))
    expect(got).toBeTruthy
  })
})

describe('parseYouTubeVideoId', () => {
  const videoId = '0zM3nApSvMg'

  it('returns empty with not YouTube URL', async () => {
    const got = parseYouTubeVideoId(new URL('https://www.google.com/'))
    expect(got).toEqual('')
  })

  it('returns videoId with youtu.be', async () => {
    const got = parseYouTubeVideoId(new URL('http://youtu.be/0zM3nApSvMg'))
    expect(got).toEqual(videoId)
  })

  it('returns videoId with www.youtube.com/watch', async () => {
    const got = parseYouTubeVideoId(new URL('http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index'))
    expect(got).toEqual(videoId)
  })

  it('returns videoId with www.youtube.com/v', async () => {
    const got = parseYouTubeVideoId(new URL('http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0'))
    expect(got).toEqual(videoId)
  })

  it('returns videoId with www.youtube.com/embed', async () => {
    const got = parseYouTubeVideoId(new URL('http://www.youtube.com/embed/0zM3nApSvMg?rel=0'))
    expect(got).toEqual(videoId)
  })
})

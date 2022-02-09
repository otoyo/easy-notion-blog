import { IncomingMessage, ServerResponse } from 'http'
import { renderToStaticMarkup } from 'react-dom/server'

import { getBlogLink } from '../../lib/blog-helpers'
import { getAllPosts } from '../../lib/notion/client'

function decode(string) {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function mapToEntry(post) {
  const date = new Date(post.Date)
  return `
    <entry>
      <id>https://easy-notion-blog-02.vercel.app${getBlogLink(post.Slug)}</id>
      <title>${decode(post.Title)}</title>
      <link href="https://easy-notion-blog-02.vercel.app${getBlogLink(
        post.Slug
      )}"/>
      <published>${date.toJSON()}</published>
      <updated>${date.toJSON()}</updated>
      <author>
        <name>@mineral_30</name>
        <uri>https://twitter.com/mineral_30</uri>
      </author>
      <content type="xhtml">
        <div xmlns="http://www.w3.org/1999/xhtml">
          ${renderToStaticMarkup(post.Excerpt)}
        </div>
      </content>
    </entry>`
}

function concat(total, item) {
  return total + item
}

function createRSS(posts = []) {
  const postsString = posts.map(mapToEntry).reduce(concat, '')
  const updated =
    posts.length > 0
      ? `
    <updated>${new Date(posts[0].Date).toJSON()}</updated>`
      : ''

  return `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>herohoroブログ</title>
    <subtitle>herohoroブログの更新情報</subtitle>
    <link href="https://easy-notion-blog-02.vercel.app/atom" rel="self" type="application/rss+xml"/>
    <link href="https://easy-notion-blog-02.vercel.app" />${updated}
    <id>https://easy-notion-blog-02.vercel.app/atom</id>${postsString}
  </feed>`
}

const Atom = async function(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'text/xml')
  try {
    const posts = await getAllPosts()
    res.write(createRSS(posts))
    res.end()
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end()
  }
}

export default Atom

import { notFound } from 'next/navigation'
import { NUMBER_OF_POSTS_PER_PAGE } from 'app/server-constants'

import { getPostsByTag, getAllTags } from 'lib/notion/client'

import Layout from 'layouts/Layout'
import CardSmall from 'components/card/CardSmall'

export const revalidate = 60
// TODO: Enable after fixed https://github.com/vercel/next.js/issues/43357
// export const dynamicParams = false

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({ tag: tag }))
}

const BlogTagPage = async ({ params: { tag: encodedTag } }) => {
  const tag = decodeURIComponent(encodedTag)

  const posts = await getPostsByTag(tag, NUMBER_OF_POSTS_PER_PAGE)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <>
      <Layout>{posts.length > 0 ? <CardSmall title={tag} posts={posts} /> : ''}</Layout>
    </>
  )
}

export default BlogTagPage

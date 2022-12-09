import { redirect } from 'next/navigation'
import { Post } from 'lib/notion/interfaces'
import GoogleAnalytics from 'components/google-analytics'
import { getAllPosts, getPostBySlug, getPostsByTag, getAllBlocksByBlockId } from 'lib/notion/client'

import Single from 'components/layout/Single'

export const revalidate = 30
export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.Slug }))
}

const BlogSlugPage = async ({ params: { slug } }) => {
  const post = await getPostBySlug(slug)

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`)
    redirect('/blog')
  }

  const [blocks, sameTagPosts] = await Promise.all([getAllBlocksByBlockId(post.PageId), getPostsByTag(post.Tags[0], 6)])

  const otherPostsHavingSameTag = sameTagPosts.filter((p: Post) => p.Slug !== post.Slug)

  return (
    <>
      <GoogleAnalytics pageTitle={post.Title} />
      <Single post={post} blocks={blocks} sameTagPosts={otherPostsHavingSameTag} />
    </>
  )
}

export default BlogSlugPage

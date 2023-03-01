import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import {
  NEXT_PUBLIC_URL,
  NEXT_PUBLIC_SITE_TITLE,
} from '../../server-constants'
import { Post } from '../../../lib/notion/interfaces'
import GoogleAnalytics from '../../../components/google-analytics'
import {
  BlogPostLink,
  BlogTagLink,
  NoContents,
  PostBody,
  PostDate,
  PostTags,
  PostTitle,
} from '../../../components/blog-parts'
import SocialButtons from '../../../components/social-buttons'
import styles from '../../../styles/blog.module.css'
import { getBlogLink } from '../../../lib/blog-helpers'
import {
  getPosts,
  getAllPosts,
  getRankedPosts,
  getPostBySlug,
  getPostsByTag,
  getAllTags,
  getAllBlocksByBlockId,
} from '../../../lib/notion/client'

export const revalidate = 30

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  const title = `${post?.Title} - ${NEXT_PUBLIC_SITE_TITLE}`
  const description = post?.Excerpt
  const url = NEXT_PUBLIC_URL ? new URL(getBlogLink(post?.Slug || ''), NEXT_PUBLIC_URL) : undefined
  const images = NEXT_PUBLIC_URL ? [{ url: new URL(`/api/og-image?slug=${post?.Slug}`, NEXT_PUBLIC_URL) }] : []

  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: title,
      type: 'website',
      images: images,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: images,
    },
    alternates: {
      canonical: url,
    },
  }

  return metadata
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.Slug }))
}

const BlogSlugPage = async ({ params: { slug } }) => {
  const post = await getPostBySlug(slug)

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`)
    redirect('/blog')
  }

  const [
    blocks,
    rankedPosts,
    recentPosts,
    tags,
    sameTagPosts,
  ] = await Promise.all([
    getAllBlocksByBlockId(post.PageId),
    getRankedPosts(),
    getPosts(5),
    getAllTags(),
    getPostsByTag(post.Tags[0]?.name, 6),
  ])

  const otherPostsHavingSameTag = sameTagPosts.filter((p: Post) => p.Slug !== post.Slug)

  return (
    <>
      <GoogleAnalytics pageTitle={post.Title} />
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.post}>
            <PostDate post={post} />
            <PostTags post={post} />
            <PostTitle post={post} enableLink={false} />

            <NoContents contents={blocks} />
            <PostBody blocks={blocks} />

            <footer>
              {NEXT_PUBLIC_URL && (
                <SocialButtons
                  title={post.Title}
                  url={new URL(
                    getBlogLink(post.Slug),
                    NEXT_PUBLIC_URL
                  ).toString()}
                  id={post.Slug}
                />
              )}
            </footer>
          </div>
        </div>

        <div className={styles.subContent}>
          <BlogPostLink
            heading="Posts in the same category"
            posts={otherPostsHavingSameTag}
          />
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
          <BlogPostLink heading="Latest posts" posts={recentPosts} />
          <BlogTagLink heading="Categories" tags={tags} />
        </div>
      </div>
    </>
  )
}

export default BlogSlugPage

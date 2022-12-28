import { notFound } from 'next/navigation'
import { NUMBER_OF_POSTS_PER_PAGE } from '../../../../app/server-constants'
import GoogleAnalytics from '../../../../components/google-analytics'
import {
  BlogPostLink,
  BlogTagLink,
  NextPageLink,
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  ReadMoreLink,
} from '../../../../components/blog-parts'
import styles from '../../../../styles/blog.module.css'
import {
  getPosts,
  getRankedPosts,
  getPostsByTag,
  getFirstPostByTag,
  getAllTags,
} from '../../../../lib/notion/client'

export const revalidate = 60

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map(tag => ({ tag: tag }))
}

const BlogTagPage = async ({ params: { tag: encodedTag } }) => {
  const tag = decodeURIComponent(encodedTag)

  const posts = await getPostsByTag(tag, NUMBER_OF_POSTS_PER_PAGE)

  if (posts.length === 0) {
    notFound()
  }

  const [firstPost, rankedPosts, recentPosts, tags] = await Promise.all([
    getFirstPostByTag(tag),
    getRankedPosts(),
    getPosts(5),
    getAllTags(),
  ])

  return (
    <>
      <GoogleAnalytics pageTitle={`Posts in ${tag}`} />
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <header>
            <h2>{tag}</h2>
          </header>

          {posts.map(post => {
            return (
              <div className={styles.post} key={post.Slug}>
                <PostDate post={post} />
                <PostTags post={post} />
                <PostTitle post={post} />
                <PostExcerpt post={post} />
                <ReadMoreLink post={post} />
              </div>
            )
          })}

          <footer>
            <NextPageLink firstPost={firstPost} posts={posts} tag={tag} />
          </footer>
        </div>

        <div className={styles.subContent}>
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
          <BlogPostLink heading="Latest Posts" posts={recentPosts} />
          <BlogTagLink heading="Categories" tags={tags} />
        </div>
      </div>
    </>
  )
}

export default BlogTagPage

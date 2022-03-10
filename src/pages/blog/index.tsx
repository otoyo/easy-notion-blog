import DocumentHead from '../../components/document-head'

import {
  BlogPostLink,
  BlogTagLinkNoList,
  NextPageLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  // PostThumbnail,
  TwitterTimeline,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import {
  getPosts,
  getFirstPost,
  getRankedPosts,
  getAllTags,
} from '../../lib/notion/client'
import * as imageCache from '../../lib/notion/image-cache'

export async function getStaticProps() {
  const posts = await getPosts()
  const firstPost = await getFirstPost()
  const rankedPosts = await getRankedPosts()
  const tags = await getAllTags()

  posts.forEach(p => p.OGImage && imageCache.store(p.PageId, p.OGImage))

  return {
    props: {
      posts,
      firstPost,
      rankedPosts,
      tags,
    },
    revalidate: 60,
  }
}

const RenderPosts = ({
  posts = [],
  firstPost,
  rankedPosts = [],
  tags = [],
}) => {
  return (
    <div className={styles.container}>
      <DocumentHead title="Blog" />

      <div className={styles.mainContent}>
        {/* <IndexBlogTagLink heading="Tags" tags={tags} /> */}
        <NoContents contents={posts} />
        <div className={styles.mainGallery}>
          {posts.map(post => {
            return (
              <div className={styles.post} key={post.Slug}>
                <PostDate post={post} />
                <PostTitle post={post} />
                {/* <PostThumbnail post={post} /> */}
                {/* <Link href="/blog/[slug]" as={BlogPostLink(post.Slug)} passHref>
                <img className={stylesParts.thumbnail} src={post.OGImage} />
              </Link> */}
                <PostTags post={post} />
                <PostExcerpt post={post} />
              </div>
            )
          })}
        </div>
        <footer>
          <NextPageLink firstPost={firstPost} posts={posts} />
        </footer>
      </div>

      <div className={styles.subContent}>
        <BlogTagLinkNoList heading="Tag List" tags={tags} />
        <BlogPostLink heading="Recommended" posts={rankedPosts} />
        <TwitterTimeline />
      </div>
    </div>
  )
}

export default RenderPosts

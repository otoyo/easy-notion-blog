import DocumentHead from '../../components/document-head'

import Link from 'next/link'
import {
  BlogPostLink,
  BlogTagLinkNoList,
  IndexBlogTagLink,
  NextPageLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  ReadMoreLink,
  PostThumbnail,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import stylesParts from '../../styles/blog-parts.module.css'
import {
  getPosts,
  getFirstPost,
  getRankedPosts,
  getAllTags,
} from '../../lib/notion/client'

export async function getStaticProps() {
  const posts = await getPosts()
  const firstPost = await getFirstPost()
  const rankedPosts = await getRankedPosts()
  const tags = await getAllTags()

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
                <PostThumbnail post={post} />
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
        <h3>Twitter Timeline</h3>
        <hr />
        <a
          className="twitter-timeline"
          data-width="300"
          data-height="500"
          data-theme="light"
          href="https://twitter.com/mineral_30?ref_src=twsrc%5Etfw"
        >
          Tweets by mineral_30
        </a>{' '}
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          // charset="utf-8"
        ></script>
      </div>
    </div>
  )
}

export default RenderPosts

import DocumentHead from '../../components/document-head'

import Link from 'next/link'
import {
  BlogPostLink,
  BlogTagLink,
  NextPageLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  ReadMoreLink,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
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
        <NoContents contents={posts} />

        {posts.map(post => {
          return (
            <div className={styles.post} key={post.Slug}>
              <PostDate post={post} />
              <PostTitle post={post} />
              <Link href="/blog/[slug]" as={BlogPostLink(post.Slug)} passHref>
                <img className={styles.thumbnail} src={post.OGImage} />
              </Link>
              <PostTags post={post} />
              <PostExcerpt post={post} />
              <ReadMoreLink post={post} />
            </div>
          )
        })}

        <footer>
          <NextPageLink firstPost={firstPost} posts={posts} />
        </footer>
      </div>

      <div className={styles.subContent}>
        <BlogPostLink heading="Recommended" posts={rankedPosts} />
        <BlogTagLink heading="Categories" tags={tags} />
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

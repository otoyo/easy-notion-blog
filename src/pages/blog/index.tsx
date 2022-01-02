import Link from 'next/link'
import Image from 'next/image'
import Header from '../../components/header'
import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'
import {
  getBlogLink,
  getTagLink,
  getBeforeLink,
  getDateStr,
} from '../../lib/blog-helpers'
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
    <>
      <Header path="/blog" titlePre="" />
      <div className={`${blogStyles.flexContainer}`}>
        <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
          {posts.length === 0 && (
            <p className={blogStyles.noPosts}>There are no posts yet</p>
          )}
          {posts.map(post => {
            return (
              <div className={blogStyles.postPreview} key={post.Slug}>
                {post.Date && (
                  <div className="posted">
                    📅&nbsp;&nbsp;{getDateStr(post.Date)}
                  </div>
                )}
                <h3>
                  <div className={blogStyles.titleContainer}>
                    <Link
                      href="/blog/[slug]"
                      as={getBlogLink(post.Slug)}
                      passHref
                    >
                      <a>{post.Title}</a>
                    </Link>
                  </div>
                </h3>
                <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
                  <img className={blogStyles.thumbnail} src={post.OGImage} />
                </Link>
                <div className={blogStyles.tagContainer}>
                  {post.Tags &&
                    post.Tags.length > 0 &&
                    post.Tags.map(tag => (
                      <Link
                        href="/blog/tag/[tag]"
                        as={getTagLink(tag)}
                        key={`${post.Slug}-${tag}`}
                        passHref
                      >
                        <a className={blogStyles.tag}>🔖&nbsp;&nbsp;{tag}</a>
                      </Link>
                    ))}
                </div>
                <p>{post.Excerpt}</p>
                {/* <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
                  <a className={blogStyles.expandButton}>Read more...</a>
                </Link> */}
              </div>
            )
          })}
          {!!firstPost &&
            posts.length > 0 &&
            firstPost.Date !== posts[posts.length - 1].Date && (
              <div className={blogStyles.nextContainer}>
                <hr />
                <Link
                  href="/blog/before/[date]"
                  as={getBeforeLink(posts[posts.length - 1].Date)}
                  passHref
                >
                  <a className={blogStyles.nextButton_topPage}>Next ＞</a>
                </Link>
              </div>
            )}
        </div>
        <div className={blogStyles.sideMenu}>
          <h3>Recommended</h3>
          <hr />
          {rankedPosts.length === 0 && (
            <div className={blogStyles.noContents}>There are no posts yet</div>
          )}
          {rankedPosts.length > 0 && (
            <ul>
              {rankedPosts.map(rankedPost => {
                return (
                  <li key={rankedPost.Slug}>
                    <Link
                      href="/blog/[slug]"
                      as={getBlogLink(rankedPost.Slug)}
                      passHref
                    >
                      <a>{rankedPost.Title}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
          <h3>Categories</h3>
          <hr />
          {tags.length === 0 && (
            <div className={blogStyles.noContents}>There are no tags yet</div>
          )}
          {tags.length > 0 && (
            <ul>
              {tags.map(tag => {
                return (
                  <li key={tag}>
                    <Link href="/blog/tag/[tag]" as={getTagLink(tag)} passHref>
                      <a>{tag}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
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
    </>
  )
}

export default RenderPosts

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { NUMBER_OF_POSTS_PER_PAGE } from '../../../lib/notion/server-constants'
import DocumentHead from '../../../components/document-head'
import {
  BlogPostLink,
  BlogTagLink,
  NextPageLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  PostsNotFound,
  ReadMoreLink,
  PostThumbnail,
} from '../../../components/blog-parts'
import stylesParts from '../../../styles/blog-parts.module.css'
import styles from '../../../styles/blog.module.css'

import { getBeforeLink } from '../../../lib/blog-helpers'
import {
  getPosts,
  getRankedPosts,
  getPostsBefore,
  getFirstPost,
  getAllTags,
} from '../../../lib/notion/client'

export async function getStaticProps({ params: { date } }) {
  if (!Date.parse(date) || !/\d{4}-\d{2}-\d{2}/.test(date)) {
    return { notFound: true }
  }

  const posts = await getPostsBefore(date, NUMBER_OF_POSTS_PER_PAGE)
  const firstPost = await getFirstPost()
  const rankedPosts = await getRankedPosts()
  const tags = await getAllTags()

  return {
    props: {
      date,
      posts,
      firstPost,
      rankedPosts,
      tags,
    },
    revalidate: 3600,
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()
  const path = getBeforeLink(posts[posts.length - 1].Date)

  return {
    paths: [path],
    fallback: 'blocking',
  }
}

const RenderPostsBeforeDate = ({
  date,
  posts = [],
  firstPost,
  rankedPosts = [],
  tags = [],
  redirect,
}) => {
  const router = useRouter()

  useEffect(() => {
    if (redirect && !posts) {
      router.replace(redirect)
    }
  }, [router, redirect, posts])

  if (!posts) {
    return <PostsNotFound />
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <DocumentHead description={`Post before ${date}`} />
        <header className={styles.mainTop}>
          <h2>Posts before {date}</h2>
        </header>

        <div className={styles.mainGallery}>
          <NoContents contents={posts} />

          {posts.map(post => {
            return (
              <div className={styles.post} key={post.Slug}>
                <PostDate post={post} />
                <PostTitle post={post} />
                <PostThumbnail post={post} />
                <PostTags post={post} />
                <PostExcerpt post={post} />
              </div>
            )
          })}
        </div>

        <footer>
          {!!firstPost &&
            posts.length > 0 &&
            firstPost.Date !== posts[posts.length - 1].Date && (
              <div className={stylesParts.nextContainer}>
                <hr />
                <div className={stylesParts.buttonSubContainer}>
                  <a
                    className={stylesParts.backButton}
                    onClick={() => router.back()}
                  >
                    {' '}
                    ＜ Back{' '}
                  </a>
                  <Link
                    href="/blog/before/[date]"
                    as={getBeforeLink(posts[posts.length - 1].Date)}
                    passHref
                  >
                    <a className={stylesParts.nextButton}>Next ＞</a>
                  </Link>
                </div>
              </div>
            )}

          {!!firstPost &&
            posts.length > 0 &&
            firstPost.Date == posts[posts.length - 1].Date && (
              <div className={stylesParts.nextContainer}>
                <hr />
                <a
                  className={stylesParts.backButton}
                  onClick={() => router.back()}
                >
                  ＜ Back
                </a>
              </div>
            )}
        </footer>
      </div>
      <div className={styles.subContent}>
        <BlogTagLink heading="Categories" tags={tags} />
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

export default RenderPostsBeforeDate

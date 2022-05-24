import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
// import Link from 'next/link'
// import { getBeforeLink } from '../../../../../lib/blog-helpers'
import { NUMBER_OF_POSTS_PER_PAGE } from '../../../../../lib/notion/server-constants'
import DocumentHead from '../../../../../components/document-head'
import {
  BlogPostLink,
  //   BlogTagLink,
  BlogTagLink,
  NextPageLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  PostsNotFound,
  PostThumbnail,
  //   ReadMoreLink,
  TwitterTimeline,
} from '../../../../../components/blog-parts'
// import styles from '../../../../../styles/blog.module.css'

import {
  getPosts,
  getRankedPosts,
  getPostsByTagBefore,
  getFirstPostByTag,
  getAllTags,
} from '../../../../../lib/notion/client'

import stylesParts from '../../../../../styles/blog-parts.module.css'
import styles from '../../../../../styles/blog.module.css'

export async function getStaticProps({ params: { tag, date } }) {
  if (!Date.parse(date) || !/\d{4}-\d{2}-\d{2}/.test(date)) {
    return { notFound: true }
  }

  const posts = await getPostsByTagBefore(tag, date, NUMBER_OF_POSTS_PER_PAGE)

  if (posts.length === 0) {
    console.log(`Failed to find posts for tag: ${tag}`)
    return {
      props: {
        redirect: '/blog',
      },
      revalidate: 30,
    }
  }

  const [firstPost, rankedPosts, recentPosts, tags] = await Promise.all([
    getFirstPostByTag(tag),
    getRankedPosts(),
    getPosts(5),
    getAllTags(),
  ])

  return {
    props: {
      date,
      posts,
      firstPost,
      rankedPosts,
      recentPosts,
      tags,
      tag,
    },
    revalidate: 3600,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

const RenderPostsByTagBeforeDate = ({
  date,
  posts = [],
  firstPost,
  rankedPosts = [],
  recentPosts = [],
  tags = [],
  tag,
  redirect,
}) => {
  const router = useRouter()

  useEffect(() => {
    if (redirect && posts.length === 0) {
      router.replace(redirect)
    }
  }, [router, redirect, posts])

  if (!posts) {
    return <PostsNotFound />
  }

  return (
    <div className={styles.container}>
      <DocumentHead description={`Posts in ${tag} before ${date}`} />

      <div className={styles.mainContent}>
        <header className={styles.mainTop}>
          <h2>{tag}</h2>
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
          <NextPageLink firstPost={firstPost} posts={posts} tag={tag} />
          {/* {!!firstPost &&
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
            )} */}

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
        {/* <BlogPostLink heading="Recommended" posts={rankedPosts} />
        <BlogPostLink heading="Latest Posts" posts={recentPosts} />
        <BlogTagLink heading="Categories" tags={tags} /> */}
        <BlogTagLink heading="Tag List" tags={tags} />
        <BlogPostLink heading="Recommended" posts={rankedPosts} />
        <BlogPostLink heading="Latest Posts" posts={recentPosts} />
        <TwitterTimeline />
      </div>
    </div>
  )
}

export default RenderPostsByTagBeforeDate

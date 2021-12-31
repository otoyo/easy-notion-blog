import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Router from 'next/router'
import Image from 'next/image'

import { NUMBER_OF_POSTS_PER_PAGE } from '../../../lib/notion/server-constants'
import Header from '../../../components/header'
import blogStyles from '../../../styles/blog.module.css'
import sharedStyles from '../../../styles/shared.module.css'

import {
  getBlogLink,
  getTagLink,
  getBeforeLink,
  getDateStr,
} from '../../../lib/blog-helpers'
import {
  getPosts,
  getRankedPosts,
  getPostsBefore,
  getFirstPost,
  getAllTags,
  getPostBySlug,
  getPostsByTag,
  getAllBlocksByPageId,
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

  // only latest 1 page will be returned in order to reduce build time
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

  // if you don't have a post at this point, and are not
  // loading one from fallback then  redirect back to the index
  if (!posts) {
    return (
      <div className={blogStyles.post}>
        <p>
          Woops! did not find the posts, redirecting you back to the blog index
        </p>
      </div>
    )
  }

  return (
    <>
      <Header
        path={getBeforeLink(date)}
        titlePre={`Posts before ${date}`}
        description={`Posts before ${date}`}
      />
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
                <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
                  <a className={blogStyles.expandButton}>Read more...</a>
                </Link>
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
                  <a className={blogStyles.nextButton}>Next ＞</a>
                </Link>
                <a
                  className={blogStyles.backButton}
                  onClick={() => Router.back()}
                >
                  ＜ Back
                </a>
              </div>
            )}
          {!!firstPost &&
            posts.length > 0 &&
            firstPost.Date == posts[posts.length - 1].Date && (
              <div className={blogStyles.nextContainer}>
                <hr />
                <a
                  className={blogStyles.backButton}
                  onClick={() => Router.back()}
                >
                  ＜ Back
                </a>
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
        </div>
      </div>
    </>
  )
}

export default RenderPostsBeforeDate

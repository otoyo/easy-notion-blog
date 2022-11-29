import React from 'react'
import Link from 'next/link'

import { Post } from '../lib/notion/interfaces'
import NotionBlocks from './notion-block'
import { getBeforeLink, getBlogLink, getDateStr, getTagLink, getTagBeforeLink } from '../lib/blog-helpers'
import styles from '../styles/blog-parts.module.css'
import DateFormatter from 'components/Date'

export const PostDate = ({ post }) => (
  <li className={styles.postDate}>
    <DateFormatter dateString={post.Date ? getDateStr(post.Date) : ''} />
  </li>
)

export const PostTitle = ({ post, enableLink = true }) => {
  const postTitle = post.Title ? post.Title : ''

  return (
    <h1>
      {enableLink ? (
        <Link href={getBlogLink(post.Slug)}>
          {postTitle}
        </Link>
      ) : (
        postTitle
      )}
    </h1>
  )
}

export const PostTags = ({ post }) => (
  <li>
    {post.Tags &&
      post.Tags.length > 0 &&
      post.Tags.map((tag: string) => (
        <Link href={getTagLink(tag)} key={tag}>
          {tag}
        </Link>
      ))}
  </li>
)

export const PostExcerpt = ({ post }) => (
  <div className={styles.postExcerpt}>
    <p>{post.Excerpt ? post.Excerpt : ''}</p>
  </div>
)

export const PostBody = ({ blocks }) => (
  <div className={styles.postBody}>
    <NotionBlocks blocks={blocks} />
  </div>
)

export const ReadMoreLink = ({ post }) => (
  <div className={styles.readMoreLink}>
    <Link href={getBlogLink(post.Slug)} className={styles.readMore}>
      Read more
    </Link>
  </div>
)

export const NextPageLink = ({ firstPost, posts, tag = '' }) => {
  if (!firstPost) return null
  if (posts.length === 0) return null

  const lastPost = posts[posts.length - 1]

  if (firstPost.Date === lastPost.Date) return null

  return (
    <div className={styles.nextPageLink}>
      <Link
        href={
          tag
            ? getTagBeforeLink(tag, lastPost.Date)
            : getBeforeLink(lastPost.Date)
        }
      >
        Next page ＞
      </Link>
    </div>
  )
}

export const NoContents = ({ contents }) => {
  if (!!contents && contents.length > 0) return null

  return <div className={styles.noContents}>There are no contents yet</div>
}

export const BlogPostLink = ({ heading, posts }) => (
  <>
    <h3>{heading}</h3>
    <NoContents contents={posts} />
    <PostLinkList posts={posts} />
  </>
)

export const BlogTagLink = ({ heading, tags }) => (
  <div>
    <h3>{heading}</h3>
    <NoContents contents={tags} />
    <TagLinkList tags={tags} />
  </div>
)

export const PostLinkList = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  return (
    <ul>
      {posts.map((post: Post) => {
        return (
          <li key={post.Slug}>
            <Link href={getBlogLink(post.Slug)}>
              <div className='story-figure' style={{ backgroundImage: `url(${post.coverEyeCatch})` }}></div>
              <span>{post.Title}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export const TagLinkList = ({ tags }) => {
  if (!tags || tags.length === 0) return null

  return (
    <ul>
      {tags.map((tag: string) => {
        return (
          <li key={tag}>
            <Link href={getTagLink(tag)}>
              {tag}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export const PostsNotFound = () => (
  <div className={styles.postsNotFound}>Woops! did not find the posts, redirecting you back to the blog index</div>
)

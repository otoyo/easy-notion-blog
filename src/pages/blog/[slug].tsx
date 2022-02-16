import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { NEXT_PUBLIC_URL } from '../../lib/notion/server-constants'
import DocumentHead from '../../components/document-head'
import {
  BlogPostLink,
  BlogTagLinkNoList,
  NoContents,
  PostBody,
  PostDate,
  PostTitleSlug,
  PostTags,
  PostTagsSlug,
  PostTitle,
  PostsNotFound,
  PostThumbnail,
  TwitterTimeline,
} from '../../components/blog-parts'
import SocialButtons from '../../components/social-buttons'
import styles from '../../styles/blog.module.css'
import stylesParts from '../../styles/blog-parts.module.css'
import stylesShared from '../../styles/shared.module.css'
import { getBlogLink } from '../../lib/blog-helpers'
import {
  getPosts,
  getAllPosts,
  getRankedPosts,
  getPostBySlug,
  getPostsByTag,
  getAllTags,
  getAllBlocksByBlockId,
} from '../../lib/notion/client'

export async function getStaticProps({ params: { slug } }) {
  const post = await getPostBySlug(slug)

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`)
    return {
      props: {
        redirect: '/blog',
      },
      revalidate: 30,
    }
  }

  const blocks = await getAllBlocksByBlockId(post.PageId)
  const rankedPosts = await getRankedPosts()
  const recentPosts = await getPosts(5)
  const tags = await getAllTags()

  let sameTagPosts = []
  if (post.Tags.length > 0) {
    sameTagPosts = (await getPostsByTag(post.Tags[0], 6)).filter(
      p => p.Slug !== post.Slug
    )
  }

  return {
    props: {
      post,
      blocks,
      rankedPosts,
      recentPosts,
      sameTagPosts,
      tags,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts()
  return {
    paths: posts.map(post => getBlogLink(post.Slug)),
    fallback: 'blocking',
  }
}

const RenderPost = ({
  post,
  blocks = [],
  rankedPosts = [],
  recentPosts = [],
  sameTagPosts = [],
  tags = [],
  redirect,
}) => {
  const router = useRouter()

  useEffect(() => {
    if (redirect && !post) {
      router.replace(redirect)
    }
  }, [router, redirect, post])

  if (!post) {
    return <PostsNotFound />
  }

  return (
    <div className={styles.container}>
      <DocumentHead
        title={post.Title}
        description={post.Excerpt}
        urlOgImage={post.OGImage}
      />

      <div className={styles.mainContent}>
        <div className={styles.postSlug}>
          <PostDate post={post} />
          <PostTitleSlug post={post} enableLink={false} />
          <PostThumbnail post={post} />
          <PostTagsSlug post={post} />
          <br />
          <hr />

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
          posts={sameTagPosts}
        />
        <BlogTagLinkNoList heading="Tag List" tags={tags} />
        <BlogPostLink heading="Recommended" posts={rankedPosts} />
        <BlogPostLink heading="Latest posts" posts={recentPosts} />
        <TwitterTimeline />
      </div>
    </div>
  )
}

export default RenderPost

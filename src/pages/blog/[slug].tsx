import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { NEXT_PUBLIC_URL } from '../../lib/notion/server-constants'
import DocumentHead from '../../components/document-head'
import {
  BlogPostLink,
  BlogTagLink,
  NoContents,
  PostBody,
  PostDate,
  PostEditTimeStr,
  PostTitleSlug,
  PostTagsSlug,
  // PostThumbnailSlug,
  PostsNotFound,
  TwitterTimeline,
  ClosePhrase,
  IndexList,
  NewPostList,
} from '../../components/blog-parts'
import SocialButtons from '../../components/social-buttons'
import styles from '../../styles/blog.module.css'
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

  const [
    blocks,
    rankedPosts,
    recentPosts,
    tags,
    sameTagPosts,
  ] = await Promise.all([
    getAllBlocksByBlockId(post.PageId),
    getRankedPosts(),
    getPosts(5),
    getAllTags(),
    getPostsByTag(post.Tags[0], 6),
  ])

  return {
    props: {
      post,
      blocks,
      rankedPosts,
      recentPosts,
      tags,
      sameTagPosts: sameTagPosts.filter(p => p.Slug !== post.Slug),
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
        urlOgImage={new URL(
          `/notion_images/${post.PageId}.png`,
          NEXT_PUBLIC_URL
        ).toString()}
      />
      <div className={styles.flexWraper}>
        <div className={styles.mainContent}>
          <div className={styles.postSlug}>
            <PostDate post={post} />
            <PostTitleSlug post={post} enableLink={false} />
            {/* <PostThumbnailSlug post={post} /> */}
            <PostTagsSlug post={post} />
            <br />
            <hr />
            <PostEditTimeStr post={post} />

            <NoContents contents={blocks} />
            <PostBody blocks={blocks} />
            <ClosePhrase />

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
            <p>
              ▼　この記事に興味があったら同じタグから関連記事をのぞいてみてね
            </p>
            <PostTagsSlug post={post} />
          </div>
        </div>

        <div className={styles.subContent}>
          <BlogPostLink
            heading="Posts in the same tag"
            posts={sameTagPosts}
            enableThumnail={true}
          />
          <BlogTagLink heading="Tag List" tags={tags} />
          <BlogPostLink
            heading="Recommended"
            posts={rankedPosts}
            enableThumnail={true}
          />
          <BlogPostLink
            heading="Latest posts"
            posts={recentPosts}
            enableThumnail={true}
          />
          <TwitterTimeline />
          <IndexList heading="★ MOKUJI ★" blocks={blocks} />
          <p>
            スクロールしても目次がくっついてくるように改造したい...只今格闘中
          </p>
        </div>
      </div>
      <div className={styles.endContent}>
        <p>記事を読んだ後に表示させたい関連記事一覧</p>
        <div className={styles.endSection}>
          <BlogPostLink
            heading="Posts in the same tag"
            posts={sameTagPosts}
            enableThumnail={true}
          />
          <PostTagsSlug post={post} />
        </div>
        <div className={styles.endSection}>
          <BlogPostLink
            heading="Latest posts"
            posts={recentPosts}
            enableThumnail={true}
          />
          <div className={styles.inlineCenter}>
            <NewPostList />
          </div>
        </div>
        <div className={styles.endSection}>
          <BlogTagLink heading="Tag List" tags={tags} />
          <TwitterTimeline />
        </div>
      </div>
    </div>
  )
}

export default RenderPost

import { useRouter } from 'next/router'

import { NUMBER_OF_POSTS_PER_PAGE } from 'lib/notion/server-constants'
import DocumentHead from 'components/document-head'
import { NoContents, PostsNotFound } from 'components/blog-parts'

import { getTagLink } from 'lib/blog-helpers'
import { useEffect } from 'react'
import { getPosts, getRankedPosts, getPostsByTag, getFirstPostByTag, getAllTags } from 'lib/notion/client'

import Layout from 'layouts/Layout'
import CardSmall from 'components/card/CardSmall'

export async function getStaticProps({ params: { tag } }) {
  const posts = await getPostsByTag(tag, NUMBER_OF_POSTS_PER_PAGE)

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
      posts,
      firstPost,
      rankedPosts,
      recentPosts,
      tags,
      tag,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const tags = await getAllTags()

  return {
    paths: tags.map((tag) => getTagLink(tag)),
    fallback: 'blocking',
  }
}

const RenderPostsByTags = ({ tag, posts = [], redirect }) => {
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
    <>
      <DocumentHead description={`Posts in ${tag}`} />
      <Layout>
        <NoContents contents={posts} />
        {posts.length > 0 ? <CardSmall title={tag} posts={posts} /> : ''}
      </Layout>
    </>
  )
}

export default RenderPostsByTags

import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

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
} from 'components/blog-parts'
import { getPosts, getFirstPost, getRankedPosts, getAllTags } from 'lib/notion/client'
import { Post } from 'lib/notion/interfaces'

import config from 'utils/config'
import Layout from 'layouts/Layout'

import CardSmall from 'components/card/CardSmall'

type Props = {
  posts: Post[]
}

const Index: NextPage<Props> = ({ posts = [] }) => {
  console.log(posts)
  return (
    <>
      <Head>
        <title>{config.info.siteName}</title>
        <meta name='description' content={config.info.siteDescription} />
        <meta property='og:url' content={config.info.siteURL} />
        <meta property='og:image' content={config.info.ogp.image} />
        <meta property='og:title' content={config.info.siteName} />
        <meta property='og:description' content={config.info.siteDescription} />
        <meta name='twitter:image' content={config.info.ogp.image} />
      </Head>
      <Layout>{posts.length > 0 ? <CardSmall title='archives' posts={posts} /> : ''}</Layout>
    </>
  )
}

export async function getStaticProps() {
  const [posts] = await Promise.all([getPosts(20)])

  return {
    props: {
      posts,
    },
    revalidate: 60,
  }
}

export default Index

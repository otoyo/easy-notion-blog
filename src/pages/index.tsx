import Link from 'next/link'
import DocumentHead from 'components/document-head'
import { NextPageLink, NoContents } from 'components/blog-parts'
import { getPosts, getFirstPost, getRankedPosts, getAllTags } from 'lib/notion/client'

import config from 'utils/config'
import Layout from 'layouts/Layout'
import CardLarge from 'components/card/CardLarge'
import CardSmall from 'components/card/CardSmall'
import { Button } from 'components/base/Button'

export async function getStaticProps() {
  const [posts, firstPost, rankedPosts, tags] = await Promise.all([
    getPosts(),
    getFirstPost(),
    getRankedPosts(),
    getAllTags(),
  ])

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

const RenderPosts = ({ posts = [], firstPost, rankedPosts = [], tags = [] }) => {
  const postNum = config.setting.postNum
  const newPost = posts[0]
  const pastPost = posts.slice(1, postNum)

  return (
    <>
      <DocumentHead title='Blog' />
      <Layout>
        <NoContents contents={posts} />
        {newPost && <CardLarge post={newPost} />}
        {pastPost.length > 0 ? <CardSmall title='articles' posts={pastPost} /> : ''}
        <Button>
          <Link href='archives' passHref scroll={false}>
            Archives
          </Link>
        </Button>
        <footer>
          <NextPageLink firstPost={firstPost} posts={posts} />
        </footer>
      </Layout>
    </>
  )
}

export default RenderPosts

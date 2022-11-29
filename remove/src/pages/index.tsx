import Link from 'next/link'
import DocumentHead from 'components/document-head'
import { NoContents } from 'components/blog-parts'
import { getPosts, getFirstPost } from 'lib/notion/client'

import config from 'utils/config'
import Layout from 'layouts/Layout'
import CardLarge from 'components/card/CardLarge'
import CardSmall from 'components/card/CardSmall'
import { Button } from 'components/base/Button'

export async function getStaticProps() {
  const [posts, firstPost] = await Promise.all([getPosts(), getFirstPost()])

  return {
    props: {
      posts,
      firstPost,
    },
    revalidate: 60,
  }
}

const RenderPosts = ({ posts = [] }) => {
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
      </Layout>
    </>
  )
}

export default RenderPosts

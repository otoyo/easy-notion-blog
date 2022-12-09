import { NUMBER_OF_POSTS_PER_PAGE } from 'app/server-constants'
import { NoContents } from 'components/blog-parts'
import CardSmall from 'components/card/CardSmall'
import { getPosts } from 'lib/notion/client'

export const revalidate = 60

const Archives = async () => {
  const [posts] = await Promise.all([getPosts(NUMBER_OF_POSTS_PER_PAGE)])

  return (
    <>
      <NoContents contents={posts} />
      <CardSmall title='archives' posts={posts} />
    </>
  )
}

export default Archives

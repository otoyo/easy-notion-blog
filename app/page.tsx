import { NUMBER_OF_POSTS_PER_PAGE } from 'app/server-constants'
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
import styles from 'styles/blog.module.css'
import CardSmall from 'components/card/CardSmall'
import { getPosts, getFirstPost } from 'lib/notion/client'

export const revalidate = 60

const RootPage = async () => {
  const [posts, firstPost] = await Promise.all([getPosts(NUMBER_OF_POSTS_PER_PAGE), getFirstPost()])

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <NoContents contents={posts} />
        <CardSmall title='archives' posts={posts} />
        {posts.map((post) => {
          // return (
          //   <div className={styles.post} key={post.Slug}>
          //     <PostDate post={post} />
          //     <PostTags post={post} />
          //     <PostTitle post={post} />
          //     <PostExcerpt post={post} />
          //     <ReadMoreLink post={post} />
          //   </div>
          // )
        })}

        <footer>
          <NextPageLink firstPost={firstPost} posts={posts} />
        </footer>
      </div>
    </div>
  )
}

export default RootPage

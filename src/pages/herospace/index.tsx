import DocumentHead from '../../components/document-head'

import { BlogTagLink, TwitterTimeline } from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import { getPosts, getFirstPost, getAllTags } from '../../lib/notion/client'

export async function getStaticProps() {
  const posts = await getPosts()
  const firstPost = await getFirstPost()
  const tags = await getAllTags()

  return {
    props: {
      posts,
      firstPost,
      tags,
    },
    revalidate: 60,
  }
}

const RenderPostsSpace = ({
  //   posts = [],
  //   firstPost,

  tags = [],
}) => {
  return (
    <div className={styles.container}>
      <DocumentHead title="Space" />

      <div className={styles.mainContent}>
        <h3>このページは作って遊ぶ場所＼(^o^)／</h3>
        <p>
          未完成だけどできたのが嬉しくて貼り付けて・・・
          <br />
          いろいろ好きなように使ってます〜
        </p>
        <iframe
          src="https://notion2charts.com/embed/bad01964-6bce-4f62-bc9d-1d2899652ed6"
          width="100%"
          height="300"
          // frameborder="0"
        ></iframe>
        <p>▼　Lofi動画をアップロードしてみた</p>

        <iframe
          src="https://www.youtube.com/embed/videoseries?list=PLUq06vyynuEUdRd1lu3ncpfTSjbogScmR"
          width="50%"
          height="300"
          // frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          // allowfullscreen
        ></iframe>
        <iframe
          src="https://dev.herohoro.com"
          width="100%"
          height="600"
          // frameborder="0"
        ></iframe>
      </div>

      <div className={styles.subContent}>
        <BlogTagLink heading="Tag List" tags={tags} />

        <TwitterTimeline />
      </div>
    </div>
  )
}

export default RenderPostsSpace

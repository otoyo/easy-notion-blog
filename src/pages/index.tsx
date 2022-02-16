import DocumentHead from '../components/document-head'
import ExtLink from '../components/ext-link'
import Image from 'next/image'
import Link from 'next/link'
import { getTagLink } from '../lib/blog-helpers'
import {
  BlogPostLink,
  BlogTagLinkNoList,
  TwitterTimeline,
} from '../components/blog-parts'

import styles from '../styles/page.module.css'
import stylesBlog from '../styles/blog.module.css'
import { getPosts, getRankedPosts, getAllTags } from '../lib/notion/client'
import { relative } from 'path'

export async function getStaticProps() {
  const posts = await getPosts()
  const rankedPosts = await getRankedPosts()
  const tags = await getAllTags()

  return {
    props: {
      posts,
      rankedPosts,
      tags,
    },
    revalidate: 60,
  }
}

const RenderPage = ({ rankedPosts = [], tags = [] }) => (
  <div className={styles.container}>
    <DocumentHead />
    <div className={styles.mainContent}>
      <div style={{ display: 'block' }}>
        {/* <BlogTagLink heading="Categories" tags={tags} /> */}
        {/* <div>{getTag}</div> */}
        {/* {getTagObject.map(cate =>{
      return (
        <h2>{cate}</h2>
      )
    })} */}

        {tags.map(tag => {
          if (
            tag === 'ブログ改造日記' ||
            tag === '自動化' ||
            tag === 'easy-notion-blog_最新情報'
          ) {
            return (
              // <h3>{tag}</h3>
              <div className={styles.tagMain}>
                <Link href="/blog/tag/[tag]" as={getTagLink(tag)} passHref>
                  <p>{tag}</p>
                </Link>

                {/* <p>{getPostsByTag(tag,6)}</p> */}
              </div>

              //   {posts.map(post => {
              //     return(
              //   <div className={stylesBlog.post} key={post.Slug}>
              //   <PostDate post={post} />
              //   <PostTitle post={post} />
              //   <PostThumbnail post={post} />
              //   <PostTags post={post} />
              //   <PostExcerpt post={post} />
              // </div>
              //     )})
              //     }
            )
          } else {
            return null
          }
        })}
        <div className={styles.moreSearch}>
          <Link href="/blog">
            <p> 🔍　to Blog List </p>
          </Link>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          src="/hero-room.jpg"
          width={300}
          height={300}
          objectFit="contain"
        />
      </div>
      <div>
        <p>
          わたしはへろほろと申します。
          <br />
          便利なアイテムが好きで、notion歴もかれこれ半年程になりました。
          <br />
          エンジニアではありませんが、プログラミングは趣味でやっています。
          <br />
          このブログを開設するにあたって触れることのなかった分野にも首を突っ込み、
          <br />
          試行錯誤しながらエラーと格闘しています。
          <br />
          notionに書き溜めた記録をブログっぽく公開していきながらポートフォリオも兼ねて発展させていきたいなーと思っています＼(^o^)／よろしくねー
        </p>
      </div>
    </div>

    <div className={styles.subContent}>
      {/* <h3>Tags</h3>
      <hr/><br/>
      <div>
    {tags.map(tag => {
          
            return (
              
              <div className={styles.tagSub}>
                <Link href="/blog/tag/[tag]" as={getTagLink(tag)} passHref>
                  <p>{tag}</p>
                </Link>
              </div>

            ) 
        })}
        
        </div> */}
      <BlogTagLinkNoList heading="Tag List" tags={tags} />
      <h3>Prolile</h3>
      <hr />
      <Image src="/profile.png" width={200} height={200} objectFit="contain" />
      <ul>
        <li>勉強が趣味</li>
        <li>教えるの好き</li>
        <li>オンライン学習塾で５画面を操り指導(自称：職人)</li>
        <li>元教員・介護士</li>
        <li>家の中では無限大</li>
      </ul>
      <h3>Setup</h3>
      <hr />
      <ul>
        <li>
          <Link href="https://sparkling-cinnamon-3f9.notion.site/herohoro-48ff806d05484215b51b9dc79df15357">
            このブログを便利に使う方法⭐
          </Link>
        </li>
        <li>
          <Link href="https://easy-notion-blog-02.vercel.app/blog/tag/easy-notion-blog_%E4%BA%8B%E5%A7%8B%E3%82%81">
            easy-notion-blog導入⭐
          </Link>
        </li>
      </ul>
      <BlogPostLink heading="Recommended" posts={rankedPosts} />
      <TwitterTimeline />
      {/* <h3>Twitter Timeline</h3>
      <hr />
      <p>フォロー大歓迎＼(^o^)／</p>
      <a
        className="twitter-timeline"
        data-width="500"
        data-height="500"
        data-theme="light"
        href="https://twitter.com/mineral_30?ref_src=twsrc%5Etfw"
      >
        Tweets by mineral_30
      </a>{' '}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        // charset="utf-8"
      ></script> */}
    </div>
  </div>
)

export default RenderPage

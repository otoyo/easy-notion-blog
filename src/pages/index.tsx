import DocumentHead from '../components/document-head'
import ExtLink from '../components/ext-link'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/page.module.css'

const RenderPage = () => (
  <div className={styles.container}>
    <DocumentHead />
    <h4 className={styles.h1}>ほんの気持ち程度の解説記事もあります</h4>
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
)

export default RenderPage

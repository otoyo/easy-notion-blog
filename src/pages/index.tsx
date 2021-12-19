import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Link from 'next/link'
import sharedStyles from '../styles/shared.module.css'
import Image from 'next/image'

const RenderPage = () => (
  <>
    <Header titlePre="" />
    <div className={sharedStyles.layout}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          src="/hero-room.jpg"
          width={300}
          height={300}
          objectFit="contain"
        />
      </div>
      <div className="explanation">
        <p>
          はじめまして。わたしは へろほろと申します。
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
  </>
)

export default RenderPage

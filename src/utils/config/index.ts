import { faGithub, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

const config = {
  info: {
    siteName: 'Tsujimoto Mamoru',
    siteNameFirst: 'Tsujimoto ',
    siteNameSecond: 'Mamoru',
    siteDescription: '個人日記',
    siteURL: 'https://tsujimotomamoru.com',
    ogp: {
      type: 'blog',
      image: '/ogpImage.png',
    },
    twitter: {
      site: '@MamoruTsujimoto',
      creator: '@MamoruTsujimoto',
      card: 'summary_large_image',
    },
    icon: {
      apple: '/apple-touch-icon.png',
      fav32: '/favicon-32x32.png',
      fav16: '/favicon-16x16.png',
    },
  },
  setting: {
    transition: {
      timeout: 500,
    },
    postNum: 7,
  },
  profile: {
    names: 'Tsujimoto Mamoru',
    birth: {
      label: '年齢 - Age',
      year: 1982,
      month: 11,
      date: 16,
    },
    place: {
      birthplace: {
        label: '出生地',
        place: '沖縄県沖縄市',
      },
      current_base: {
        label: '現在の拠点',
        place: '沖縄県うるま市',
      },
    },
    hobby: {
      label: '趣味 - Hobby',
      dance: 'Break Dance / House Dance',
      instrument: 'Didgeridoo / Asalato',
      plant: 'ヘゴ / ヤエヤマヒルギ / 苔 / ホワイトゴースト',
      etc: 'モダマ収集',
    },
    skils: {
      frontend: {
        label: 'フロントエンド - Frontend',
        html: 'HTML',
        css: 'CSS / SCSS',
        javascript: 'JavaScript / Next.js / TypeScript / jQuery',
      },
      backend: {
        label: 'バックエンド - Backend',
        serverside: 'PHP / WordPress',
        database: 'MySQL',
      },
    },
    text: {
      first:
        'このサイトはリモートワーク歴12年の私自身の技術ポートフォリオ、フロントエンドの遊び場として運営しています。実装には Next.js を使用し、SSG によって生成した静的ファイルを Vercel にデプロイしています。妻、子供:3人、猫娘:2人の7人家族で、主夫兼フロントエンドをOKINAWAでやってます。',
    },
  },
  external: {
    github: {
      link: 'https://github.com/MamoruTsujimoto',
      label: 'Github: MamoruTsujimoto',
      icon: faGithub,
    },
    twitter: {
      link: 'https://twitter.com/MamoruTsujimoto',
      label: 'Twitter: MamoruTsujimoto',
      icon: faTwitter,
    },
    instagram: {
      link: 'https://www.instagram.com/tsujimotomamoru',
      label: 'Instagram: TsujimotoMamoru',
      icon: faInstagram,
    },
  },
}
export default config

[English](README.md) | 日本語

# easy-notion-blog

[![GitHub stars](https://img.shields.io/github/stars/otoyo/easy-notion-blog)](https://github.com/otoyo/easy-notion-blog/stargazers)
[![GitHub license](https://img.shields.io/github/license/otoyo/easy-notion-blog)](https://github.com/otoyo/easy-notion-blog/blob/master/LICENSE)

![easy-notion-blog-logo-2](https://user-images.githubusercontent.com/1063435/155871688-aeb3a7ea-28cb-4b84-bcde-eafc7a2a859a.png)

easy-notion-blog を使えば簡単にブログを開設できます。

ブログは Notion で書くことができます。

## スクリーンショット

![Screenshot](https://user-images.githubusercontent.com/1063435/152633191-0bda9095-52ce-4e01-9794-4268c26d0ef4.png)

## デモ

[https://easy-notion-blog-otoyo.vercel.app/blog](https://easy-notion-blog-otoyo.vercel.app/blog)

## ユーザーブログ

- [techPeck](https://techpeck.net/)
- [チャベログ](https://chabelog.com/)
- [オマツリ](https://omatsuri.vercel.app/)
- [八朔 Blog](https://hassaku-easy-notion-blog.vercel.app/)
- [shmn7iii](https://blog.shmn7iii.net/)
- [nitaking.dev](https://blog-nitaking.vercel.app/) (Contributor)
- [www.gadge7.net](https://www.gadge7.net/blog)
- [herohoro ブログ](https://herohoro.com/) (Contributor)
- [アルパカログ](https://alpacat.com/) (Owner)

## 特長

- 高速な表示
- Notion でブログが書ける
- Notion 公式 API を使用
- すべてカスタマイズ可能

## 必要要件

- [Notion](https://www.notion.so/) アカウント
- [Vercel](https://vercel.com/) アカウント
- Git

(カスタマイズしたい場合は下記も)

- Node.js v14 もしくはそれ以上
- [Yarn](https://yarnpkg.com/getting-started)

## クイックスタート

1. このリポジトリを Star します😉
2. [テンプレート](https://www.notion.so/otoyo/158bd90116004cd19aca26ad88cb5c07?v=a20acca876c2428380e5a2a33db233ed) を自分の Notion へ複製します
3. 複製したページの URL の次の部分を `DATABASE_ID` としてメモします
    * `https://notion.so/your-account/<ココ>?v=xxxx`
    * 例) `158bd90116004cd19aca26ad88cb5c07`
4. [Create an integration](https://developers.notion.com/docs#step-1-create-an-integration) からインテグレーションを作成し "Internal Integration Token" を `NOTION_API_SECRET` としてメモします
5. 複製したページを再度開き [Share a database with your integration](https://developers.notion.com/docs#step-1-create-an-integration) の手順でインテグレーションにデータベースを共有します
6. [vercel.com](https://vercel.com/) にログインします
7. プロジェクトを新規作成しリポジトリとして `otoyo/easy-notion-blog` をインポートします(チームの作成はスキップします)
8. "Configure Project" で "Environment Variables" を開き先ほどメモした `NOTION_API_SECRET` と `DATABASE_ID` を入力します
9. デプロイが完了すると Notion Blog が見えるようになります

さらに詳しい解説は[へろほろさんの記事](https://herohoro.com/blog/easy-notion-blog-firstdeploy)をご覧ください。

## データベースプロパティ

| プロパティ | 説明                                                                     | 例                    |
| ---------- | ------------------------------------------------------------------------ | --------------------- |
| Page       | ブログのエントリー                                                       |
| Slug       | エントリーの ID として使われます。URL に使用可能な文字のみ使用できます。 | my-1st-entry          |
| Date       | エントリーの公開日                                                       | 2021/12/1             |
| Tags       | エントリーを分類するためのタグ                                           | Diary                 |
| OGImage    | og-image として使うための画像                                            |
| Excerpt    | エントリーの概要                                                         | This is my 1st entry. |
| Published  | 公開状態。チェックされたエントリーだけが公開されます。                   |
| Rank       | おすすめ度。おすすめ記事一覧にランクの高いものから順に表示されます。     | 10                    |

## カスタマイズするには

このリポジトリをフォークしてローカルに clone します。

プロジェクトルートに `.env.local` ファイルを作成し下記のように環境変数を書き込みます。

```sh
NOTION_API_SECRET=<YOUR_NOTION_API_SECRET>
DATABASE_ID=<YOUR_DATABASE_ID>
```

依存関係をインストールしローカルサーバーを起動します。

```sh
# 依存関係のインストール
yarn install

# 開発サーバー(localhost:3000) の起動
yarn dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

開発環境では `Published` でないエントリーも表示されるためプレビューすることができます。ただし `Slug` が設定されていないエントリーは表示されません。

開発サーバーを停止するにはターミナルで `Ctrl+C` を押します。

## How to deploy to Google Cloud Run

See the [wiki](https://github.com/otoyo/easy-notion-blog/wiki/How-to-deploy-easy-notion-blog-to-Google-Cloud-Run).

## よくある質問

[wiki](https://github.com/otoyo/easy-notion-blog/wiki) の「よくある質問」をご覧ください。

## Lint & Test

```
yarn lint
yarn test
```

HTML を変更した場合はスナップショットを更新してください。

```
yarn jest --updateSnapshot
```

- [Jest CLI オプション --updateSnapshot](https://jestjs.io/ja/docs/cli#--updatesnapshot)

## オプション設定

- favicon
  - `public/` ディレクトリ以下に `favicon.ico` を置きます
- Google Analytics 4
  - "Environment Variables" でトラッキング ID を `NEXT_PUBLIC_GA_TRACKING_ID` として設定します
- ソーシャルボタン
  - "Environment Variables" でサイトの URL を `NEXT_PUBLIC_URL` として設定します

## バグ報告 & 要望

Issue を作成してください。日本語で大丈夫です。

## Twitter コミュニティ

- [easy-notion-blog](https://twitter.com/i/communities/1497431576975908868)

## 貢献

PR 歓迎です。

---

easy-notion-blog は [ijjk/notion-blog](https://github.com/ijjk/notion-blog) と [otoyo/notion-blog](https://github.com/otoyo/notion-blog) をベースにしています。

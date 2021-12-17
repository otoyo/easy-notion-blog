[English](README.md) | 日本語

# easy-notion-blog

[![GitHub stars](https://img.shields.io/github/stars/otoyo/easy-notion-blog)](https://github.com/otoyo/easy-notion-blog/stargazers)
[![GitHub license](https://img.shields.io/github/license/otoyo/easy-notion-blog)](https://github.com/otoyo/easy-notion-blog/blob/master/LICENSE)

easy-notion-blog を使えば簡単にブログを開設できます。

ブログは Notion で書くことができます。

## スクリーンショット

![Screenshot](https://user-images.githubusercontent.com/1063435/140594180-1683fc3d-28fd-4978-9b15-ab59cf39c2db.png)

## デモ

[https://easy-notion-blog-otoyo.vercel.app/blog](https://easy-notion-blog-otoyo.vercel.app/blog)

## ユーザーブログ

- [herohoro ブログ](https://easy-notion-blog-02.vercel.app/)
- [アルパカログ](https://alpacat.com/)

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

- Node.js v12
- [Yarn](https://yarnpkg.com/getting-started)

## クイックスタート

1. [notion.so](https://www.notion.so/) にログインします
1. 新規に空のページを作成します
1. `/table` とタイプし "Table - Inline" を選択します(下図 1)
1. "Untitled" と名前のついた一階層下のページ(データベース) に移動します(下図 2)
1. URL から次の部分を `DATABASE_ID` としてメモします `https://notion.so/your-account/<ココ>?v=xxxx`
1. [Create an integration](https://developers.notion.com/docs#step-1-create-an-integration) からインテグレーションを作成し "Internal Integration Token" を `NOTION_API_SECRET` としてメモします
1. `DATABASE_ID` をメモしたデータベースを再度開き [Share a database with your integration](https://developers.notion.com/docs#step-1-create-an-integration) の手順でインテグレーションにデータベースを共有します
1. ターミナルアプリを開きこのリポジトリをクローンします `git clone git@github.com:otoyo/easy-notion-blog.git && cd easy-notion-blog`
1. 初期化スクリプトを実行します `DATABASE_ID=<YOUR_DATABASE_ID> NOTION_API_SECRET=<YOUR_NOTION_API_SECRET> ./scripts/init-database.sh`
1. [vercel.com](https://vercel.com/) にログインします
1. プロジェクトを新規作成しリポジトリとして `otoyo/easy-notion-blog` をインポートします(チームの作成はスキップします)
1. "Configure Project" で "Environment Variables" を開き先ほどメモした `NOTION_API_SECRET` と `DATABASE_ID` を入力します
1. デプロイが完了すると Notion Blog が見えるようになります

---

図 1 `/table` とタイプしたら "Table - Inline" を選択します

![Fig. 1](https://user-images.githubusercontent.com/1063435/140594182-1a717ed1-24ed-47e7-b037-70c684273dab.png)

---

図 2 作成された "Untitled" データベースに移動します

![Fig. 2](https://user-images.githubusercontent.com/1063435/140629759-b05d7596-394d-4fe4-9861-264bb01809b8.png)

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

開発サーバーを停止するにはターミナルで `Ctrl+C` を押します。

## オプション

- favicon
  - `public/` ディレクトリ以下に `favicon.ico` を置きます
- Google Analytics 4
  - "Environment Variables" でトラッキング ID を `NEXT_PUBLIC_GA_TRACKING_ID` として設定します
- ソーシャルボタン
  - "Environment Variables" でサイトの URL を `NEXT_PUBLIC_URL` として設定します

## 貢献

PR 歓迎です。

---

easy-notion-blog は [ijjk/notion-blog](https://github.com/ijjk/notion-blog) と [otoyo/notion-blog](https://github.com/otoyo/notion-blog) をベースにしています。

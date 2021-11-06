[English](README.md) | 日本語

# easy-notion-blog

easy-notion-blog を使えば簡単にブログを開設できます。

ブログは Notion で書くことができます。

## スクリーンショット

![Screenshot](https://user-images.githubusercontent.com/1063435/140231088-5d04b7bd-1ec7-401e-860e-f60d14faaaf9.png)

## デモ

[https://easy-notion-blog-otoyo.vercel.app/blog](https://easy-notion-blog-otoyo.vercel.app/blog)

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

![Fig. 1](https://user-images.githubusercontent.com/1063435/140033686-3442a1f3-91b3-4e2e-981e-b0e998dc3b1e.png)

---

図 2 作成された "Untitled" データベースに移動します

![Fig. 2](https://user-images.githubusercontent.com/1063435/140033797-843f552d-d561-41e0-ad90-8ef0bbf5b938.png)

## カスタマイズするには

このリポジトリをあなたの GitHub アカウントにフォークして開発してください。

```sh
# 依存関係のインストール
yarn install

# 開発サーバー(localhost:3000) のスタート
yarn dev
```

## オプション

- favicon
  - `public/` ディレクトリ以下に `favicon.ico` を置きます
- Google Analytics 4
  - `lib/gtag.js` にトラッキング ID を記載します

## 貢献

PR 歓迎です。

---

easy-notion-blog は [ijjk/notion-blog](https://github.com/ijjk/notion-blog) と [otoyo/notion-blog](https://github.com/otoyo/notion-blog) をベースにしています。

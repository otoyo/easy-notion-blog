English | [日本語](README.ja.md)

# easy-notion-blog

[![GitHub stars](https://img.shields.io/github/stars/otoyo/easy-notion-blog)](https://github.com/otoyo/easy-notion-blog/stargazers)
[![GitHub license](https://img.shields.io/github/license/otoyo/easy-notion-blog)](https://github.com/otoyo/easy-notion-blog/blob/master/LICENSE)

<img src="https://user-images.githubusercontent.com/1063435/201917958-432ebbcb-6960-4106-8fd2-9ddcd7539781.jpg" width="480">
easy-notion-blog is a starter-kit for Notion Blog.  
It helps you to start your Notion Blog easily and rapidly.

- :rocket: **Quite fast** page loading
- :pencil: Can write a blog **on your Notion**
- :hammer_and_wrench: **Can fully customize** the site's appearance
- :white_check_mark: Using **official Notion APIs**

## Screenshots

### :camera_flash: Blog side

<img src="https://user-images.githubusercontent.com/1063435/201293737-63c0d504-d34b-4500-98ab-808f4d2e89f3.png" width="600">

### :camera_flash: Notion side

<img src="https://user-images.githubusercontent.com/1063435/201301619-54cf07da-e638-4751-b56c-7115ed5d4eb0.png" width="600">

## Quick Start

### Requirements

- [Notion](https://www.notion.so/)
- [Vercel](https://vercel.com/)
- Git

### Steps

1. **Star this repo** :wink:
    * It makes me motivative!
2. Duplicate [the template](https://www.notion.so/otoyo/158bd90116004cd19aca26ad88cb5c07?v=a20acca876c2428380e5a2a33db233ed) into your Notion.
3. Note the part of URL `https://notion.so/your-account/<HERE>?v=xxxx` as `DATABASE_ID`
    * ex) `158bd90116004cd19aca26ad88cb5c07`
    * :warning: **CAUTION:** `?v=NOT_THIS_VALUE`. Use ahead strings.
4. [Create an integration](https://developers.notion.com/docs/create-a-notion-integration#step-1-create-an-integration) and note "Internal Integration Token" as `NOTION_API_SECRET`
5. [Share a database with your integration](https://developers.notion.com/docs/create-a-notion-integration#step-2-share-a-database-with-your-integration) at the Notion database page
6. Go to [vercel.com](https://vercel.com/) and log-in
7. Create new project by importing this repository `otoyo/easy-notion-blog` (Skip creating a team)
8. In "Configure Project", open "Environment Variables" settings and set `NOTION_API_SECRET` and `DATABASE_ID`
9. Your Notion Blog will be published after deploy

## Demo

[https://easy-notion-blog-otoyo.vercel.app/blog](https://easy-notion-blog-otoyo.vercel.app/blog)  
See also users' sites from [wiki](https://github.com/otoyo/easy-notion-blog/wiki/Users%27-blogs-%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%83%96%E3%83%AD%E3%82%B0).

## How to customize

### Additional requirements

- Node.js v16 or higher
- [Yarn](https://yarnpkg.com/getting-started)

### Steps

1. Fork this repo from "Fork" button and clone it into your local workspace.
2. Create `.env.local` file just under the project root and put your environment variables as follows:

```sh
NOTION_API_SECRET=<YOUR_NOTION_API_SECRET>
DATABASE_ID=<YOUR_DATABASE_ID>
```

3. Install dependencies and start local server.

```sh
yarn install
yarn dev
```

In the development environment, non-published posts are also displayed to check their appearance.  
But posts without valid `Slug` won't be displayed.

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
5. Press `Ctrl+C` in the terminal to stop.

### For more information

See [wiki](https://github.com/otoyo/easy-notion-blog/wiki).

## Bug reports & feature requests

Please create an issue. **Both in English and in Japanese are OK.** :wink:

## :bird: Twitter community

You can get latest information about updates, and you can be supported by other members if you want to know how to customize.

- [easy-notion-blog](https://twitter.com/i/communities/1497431576975908868)

## Contribution

Pull requests are welcome.

---

easy-notion-blog is based on [ijjk/notion-blog](https://github.com/ijjk/notion-blog) and [otoyo/notion-blog](https://github.com/otoyo/notion-blog)

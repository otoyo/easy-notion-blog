# my-notion-blog

Notion Blog by using Notion Official API.

Deploy your [Vercel](https://vercel.com/) environment.

## Demo

WIP

## Requirements

- [Notion](https://www.notion.so/) account
- [Vercel](https://vercel.com/) account
- Git
- Node.js v12
- [Yarn](https://yarnpkg.com/getting-started)

## Quick Start

1. Go to [notion.so](https://www.notion.so/) and log-in with your Notion account.
1. Create a blank page.
1. Type `/table` and select "Table - Inline" (Fig. 1)
1. Go to under page(database) named as "Untitled" (Fig. 2)
1. Note the part of URL `https://notion.so/your-account/<HERE>?v=xxxx` as `DATABASE_ID`
1. [Create an integration](https://developers.notion.com/docs#step-1-create-an-integration) and note "Internal Integration Token" as `NOTION_API_SECRET`
1. [Share a database with your integration](https://developers.notion.com/docs#step-1-create-an-integration)
1. Clone this repo into your local `git clone git@github.com:otoyo/my-notion-blog.git`
1. Run initialization script `DATABASE_ID=<YOUR_DATABASE_ID> NOTION_API_SECRET=<YOUR_NOTION_API_SECRET> ./scripts/init-database.sh`
1. Go to [vercel.com](https://vercel.com/) and log-in with your account
1. Create new project by importing GitHub repo `otoyo/my-notion-blog` (Skip team create)
1. In "Configure Project", open "Environment Variables" settings and set `NOTION_API_SECRET` and `DATABASE_ID`
1. Your Notion Blog will be published after deploy

Fig. 1

![Fig. 1](https://user-images.githubusercontent.com/1063435/140033686-3442a1f3-91b3-4e2e-981e-b0e998dc3b1e.png)

Fig. 2

![Fig. 2](https://user-images.githubusercontent.com/1063435/140033797-843f552d-d561-41e0-ad90-8ef0bbf5b938.png)

## Optional settings

- favicon
  - Place `favicon.ico` under `public/` directory
- Google Analytics 4
  - Set your tracking ID in `lib/gtag.js`

## Customization

Fork this repo into your GitHub account and develop.

```sh
# Install dependencies
yarn install

# Start local server at localhost:3000
yarn dev
```

## Contribution

Pull requests are welcome.

---

my-notion-blog is based on [ijjk/notion-blog](https://github.com/ijjk/notion-blog)

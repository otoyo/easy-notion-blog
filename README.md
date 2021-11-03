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
1. Create new project with GitHub repo `otoyo/my-notion-blog`
1. Go to project settings > "Environment Variables", set `NOTION_API_SECRET` and `DATABASE_ID`
1. Your Notion Blog will be published after deploy

Fig. 1

WIP

Fig. 2

WIP

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

[English](README.md) | [日本語](README.ja.md) | 한국어

# easy-notion-blog

[![GitHub stars](https://img.shields.io/github/stars/otoyo/easy-notion-blog)](https://github.com/otoyo/easy-notion-blog/stargazers)
[![GitHub license](https://img.shields.io/github/license/otoyo/easy-notion-blog)](https://github.com/otoyo/easy-notion-blog/blob/master/LICENSE)

<img src="https://user-images.githubusercontent.com/1063435/201917958-432ebbcb-6960-4106-8fd2-9ddcd7539781.jpg" width="480">

easy-notion-blog는 노션 블로그의 스타트 키트입니다. Notion 블로그를 쉽고 빠르게 시작할 수 있도록 도와줍니다

- :rocket: **매우 빠른** 페이지 로딩
- :pencil: **자신의 노션으로** 블로그를 작성할 수 있습니다
- :hammer_and_wrench: 사이트의 레이아웃을 **사용자 정의할 수 있습니다**
- :white_check_mark: **Notion 공식 API를** 사용합니다

[astro-notion-blog](https://github.com/otoyo/astro-notion-blog) 는 잘 개발되고 있으니 참고 부탁드립니다.

## 스크린샷

### :camera_flash: 블로그

<img src="https://user-images.githubusercontent.com/1063435/201293737-63c0d504-d34b-4500-98ab-808f4d2e89f3.png" width="600">

### :camera_flash: 노션

<img src="https://user-images.githubusercontent.com/1063435/201301619-54cf07da-e638-4751-b56c-7115ed5d4eb0.png" width="600">

## 시작하기

### 요구사항

- 자신의 [Notion](https://www.notion.so/)
- [Vercel](https://vercel.com/) 계정
  - [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/ijjk/notion-blog/tree/main&project-name=notion-blog&repository-name=notion-blog)

- Git

### 순서

1. 이 저장소에 **별**을 남겨줍니다 :wink:
    * 별은 저에게 큰 힘이 됩니다
2. [템플릿](https://www.notion.so/otoyo/158bd90116004cd19aca26ad88cb5c07?v=a20acca876c2428380e5a2a33db233ed)을 자신의 노션에 복제합니다.
3. 복제한 페이지의 URL을 참고하여 `DATABASE_ID`로 메모합니다.
    * `https://notion.so/your-account/<여기>?v=xxxx`
    * 例) `158bd90116004cd19aca26ad88cb5c07`
    * :warning: **주의:** `?v=여기가 아닙니다`。`?v=` 이전의 내용입니다。
4. [integration 만들기](https://developers.notion.com/docs/create-a-notion-integration#step-1-create-an-integration)에 "Internal Integration Token"을 만들고 `NOTION_API_SECRET`로 메모합니다
5. 複製したページを再度開き [Share a database with your integration](https://developers.notion.com/docs/create-a-notion-integration#step-2-share-a-database-with-your-integration) の手順でインテグレーションにデータベースを共有します
6. [vercel.com](https://vercel.com/)에 로그인 합니다
7.  `otoyo/easy-notion-blog`를 fork 하거나 새로운 저장소를 만듭니다. (팀 만들기는 건너뜁니다)
8. "Configure Project"에서 "Environment Variables"를 열고, 메모했던 `NOTION_API_SECRET` 와 `DATABASE_ID`를 입력해줍니다
9. Deploy가 완료가 되면 Notion Blog 이 보이게 됩니다

더 자세한 내용은[へろほろさんの記事](https://herohoro.com/blog/easy-notion-blog-firstdeploy)을 참고합니다

## 데모

[https://easy-notion-blog-otoyo.vercel.app/blog](https://easy-notion-blog-otoyo.vercel.app/blog)  
ユーザーブログは [wiki](https://github.com/otoyo/easy-notion-blog/wiki/Users%27-blogs-%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%83%96%E3%83%AD%E3%82%B0)에서 볼 수 있습니다。

## 사용자 설정

### 추가 필요 구성

- Node.js v16이상의 버전
- [Yarn](https://yarnpkg.com/getting-started)

### 순서

1. 이 저장소를 포크하여 로컬로 clone 합니다.
2. 프로젝트 루트에 '.env.local' 파일을 작성하고 아래와 같이 환경변수를 적습니다.

```sh
NOTION_API_SECRET=<YOUR_NOTION_API_SECRET>
DATABASE_ID=<YOUR_DATABASE_ID>
```

3. 의존 관계들을 설치하고 로컬 서버를 시작합니다

```sh
# 의존 관계 설치
yarn install

# 로컬 서버(localhost:3000) 실행
yarn dev
```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속합니다

개발 환경에서는 'Published'가 아닌 엔트리도 표시되기 때문에 미리 볼 수 있습니다.다만 'Slug' 가 설정되어 있지 않은 엔트리는 표시되지 않습니다.

5. 개발 서버를 정지하려면 터미널에서 'Ctrl+C' 를 누릅니다.

### 기타 정보

[wiki](https://github.com/otoyo/easy-notion-blog/wiki) 참고하세요。

## 버그 보고 & 기능 요망

영어나 일본어로 Issue를 작성해 주세요.

## :bird: Twitter 커뮤니티

최신 업데이트 정보를 받거나 커스터마이징이 곤란할 때 다른 멤버의 도움을 받을 수 있습니다.

- [easy-notion-blog](https://twitter.com/i/communities/1497431576975908868)

## 협업

PR 환영입니다.

---

easy-notion-blog는 [ijjk/notion-blog](https://github.com/ijjk/notion-blog)를 [otoyo/notion-blog](https://github.com/otoyo/notion-blog)베이스로 하고 있습니다

import { css } from '@emotion/react'
import colors from 'utils/styles/colors'

import config from 'utils/config'

const TIMEOUT = config.setting.transition.timeout
import mixins from 'utils/styles/mixins'

const globalStyles = css`
  :root {
    --main-content: 45rem;
    --background: ${colors.background};
    --border: ${colors.border};
    --text: ${colors.tertiary};
  }

  /*
    A modern CSS reset
    https://github.com/hankchizljaw/modern-css-reset
  */
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
  ul[role='list'],
  ol[role='list'] {
    list-style: none;
  }

  /* Set core root defaults */
  html:focus-within {
    scroll-behavior: smooth;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  img,
  picture {
    max-width: 100%;
    display: block;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  /* /A modern CSS reset */

  *,
  ::after,
  ::before {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-text-size-adjust: none;
  }

  html,
  body {
    font-size: 62.5%;
  }

  html {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
    height: 100dvh;
    margin: 0;
    padding: 0;
    color: var(--text);
    font-weight: 500;
    font-family: 'Helvetica Neue', 'M PLUS 1p', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
    letter-spacing: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--background);
  }

  body.light-mode {
    color: var(--text);
    background-color: var(--background);
    transition: background-color 0.3s ease;

    .isChange {
      left: 0;
    }

    .hljs {
      color: #ccc;
      background: #22211e;
    }
  }

  body.dark-mode {
    color: #999;
    background-color: #1a1919;

    a {
      color: #999;
    }

    .isChange {
      left: -40px;
    }

    .hljs {
      background: #22211e;
    }

    .inputSearch {
      color: #999;
      background: #22211e;
      border-color: #2e2e2d;
    }

    .profileExternal {
      svg {
        color: #999;
      }
    }
  }

  section {
    position: relative;
    max-width: 100%;
    margin: 50px auto 105px;
  }

  a {
    color: var(--text);
    text-decoration: none;
  }

  button {
    padding: 0;
    font-size: 0.6rem;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    appearance: none;
  }

  #__next {
    width: 100%;
    height: 100%;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  hr {
    border: 0;
    border-top: 1px solid var(--border);
  }

  pre code {
    font-size: 1.6rem;
    font-family: Roboto, sans-serif;
    line-height: 1.8;
    letter-spacing: 0.15rem;
  }

  code.hljs {
  }

  pre code.hljs {
    display: block;
    padding: 10px 15px;
    overflow-x: auto;
  }

  .hljs::selection {
    color: #1d414d;
  }

  .hljs-comment {
    color: #767676;
  }

  .hljs-tag {
    color: #b8b8b8;
  }

  .hljs-operator,
  .hljs-punctuation,
  .hljs-subst {
    color: #ccc;
  }

  .hljs-operator {
    opacity: 0.7;
  }

  .hljs-bullet,
  .hljs-deletion,
  .hljs-name,
  .hljs-selector-tag,
  .hljs-template-variable,
  .hljs-variable {
    color: #d88568;
  }

  .hljs-attr,
  .hljs-link,
  .hljs-literal,
  .hljs-number,
  .hljs-symbol,
  .hljs-variable.constant_ {
    color: #d86868;
  }

  .hljs-title,
  .hljs-class .hljs-title,
  .hljs-title.class_ {
    color: #b99353;
  }

  .hljs-strong {
    color: #b99353;
    font-weight: 700;
  }

  .hljs-addition,
  .hljs-code,
  .hljs-string,
  .hljs-title.class_.inherited__ {
    color: #83a471;
  }

  .hljs-built_in,
  .hljs-doctag,
  .hljs-keyword.hljs-atrule,
  .hljs-quote,
  .hljs-regexp {
    color: #7c9cae;
  }

  .hljs-attribute,
  .hljs-function .hljs-title,
  .hljs-section,
  .hljs-title.function_,
  .ruby .hljs-property {
    color: #8eccdd;
  }

  .hljs-keyword {
    color: #b98eb2;
  }

  .hljs-meta,
  .hljs-meta .hljs-keyword,
  .hljs-meta .hljs-string {
    color: #8b6c37;
  }

  .diff .hljs-meta,
  .hljs-template-tag,
  .hljs-type {
    color: #b98eb2;
  }

  .hljs-emphasis {
    color: #b98eb2;
    font-style: italic;
  }

  .hljs-meta .hljs-keyword,
  .hljs-meta-keyword {
    font-weight: 700;
  }

  .page-transition-enter {
    transform: translate3d(0, 20px, 0);
    opacity: 0;
  }

  .page-transition-enter-active {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
  }

  .page-transition-exit {
    opacity: 1;
  }

  .page-transition-exit-active {
    opacity: 0;
    transition: opacity ${TIMEOUT}ms;
  }

  .loading-indicator-appear,
  .loading-indicator-enter {
    opacity: 0;
  }

  .loading-indicator-appear-active,
  .loading-indicator-enter-active {
    opacity: 1;
    transition: opacity ${TIMEOUT}ms;
  }

  // Headings
  h1 {
    ${mixins.fontSize(32, 44)}
  }

  h2 {
    ${mixins.fontSize(22, 34)}
  }

  h3 {
    ${mixins.fontSize(18, 32)}
  }

  h4 {
    ${mixins.fontSize(14, 28)}
  }

  h5 {
    ${mixins.fontSize(12, 26)}
  }

  h6 {
    ${mixins.fontSize(10, 24)}
  }

  // Paragraph Text
  p {
    ${mixins.fontSize(16, 30)}
  }
`

export default globalStyles

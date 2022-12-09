'use client'

import Link from 'next/link'
import styled from '@emotion/styled'

import { Post } from 'lib/notion/interfaces'
import DateFormatter from 'components/Date'

import styles from 'utils/styles'
import card from 'styles/components/card.module.scss'

type Props = {
  posts: Post[]
  title: string
}

const CardSmall = ({ posts, title }: Props) => {
  return (
    <Section>
      <h1 className='section-title'>{title}</h1>
      <ArticleWrapper>
        {posts.map((post) => (
          <Article key={post.Slug} className={card.article}>
            <Link as={`/blog/${post.Slug}`} href={`/blog/${post.Slug}`} passHref scroll={false}>
              <div className='story-figure figure' style={{ backgroundImage: `url(${post.coverEyeCatch})` }}></div>
              <div className='story-entrance'>
                <span className='story-category'>{post.Tags}</span>
                <h1>{post.Title}</h1>
                <div className='story-information'>
                  <ul className='story-status'>
                    <li>
                      <span className='story-publish'>
                        <DateFormatter dateString={post.Date} />
                      </span>
                    </li>
                  </ul>
                  <p>{post.Excerpt}</p>
                </div>
              </div>
            </Link>
          </Article>
        ))}
      </ArticleWrapper>
    </Section>
  )
}

const Section = styled.section`
  position: relative;
  max-width: 100%;
  margin: 50px auto 105px;
  padding: 0 20px;

  @media (max-width: ${styles.sizes.breakpoint.small}) {
    margin-bottom: 52px;
    padding: 0 0px;

    &:first-of-type {
      margin-top: 0;
    }
  }

  .section-title {
    width: 500px;
    margin: 0 auto 50px;
    padding: 0 0 10px;
    border-bottom: 1px solid #000;

    ${styles.mixins.fontSize(24, 24)}

    font-family: ${styles.fonts.raleway};
    font-weight: 500;
    color: #333;
    text-align: center;
    text-transform: capitalize;
    letter-spacing: 0.2em;

    @media (max-width: ${styles.sizes.breakpoint.small}) {
      width: 100%;
      padding: 0;
      border: none;
    }
  }

  article {
    position: relative;
    width: 100%;
    min-height: 500px;

    &.active {
      opacity: 1;
      transform: translate(0, 0);
    }

    @media (max-width: ${styles.sizes.breakpoint.small}) {
      margin-bottom: 35px;
      padding: 0 10px;

      &:after {
        content: '⋯';
        display: block;
        text-align: center;
        color: #333;
      }
    }

    &:last-of-type {
      margin-right: 0;

      @media (max-width: ${styles.sizes.breakpoint.small}) {
        margin-bottom: 0;

        &:after {
          content: '';
        }
      }
    }

    h1 {
      position: relative;
      margin: 10px 0 50px;
      min-height: 80px;
      font-family: 'ヒラギノ明朝 ProN W3', HiraMinProN-W3, YuMincho, 游明朝, 'ＭＳ Ｐ明朝', 'MS PMincho', 'MS 明朝',
        serif;
      ${styles.mixins.fontSize(24, 40)}

      letter-spacing: 0.15em;

      @media (max-width: ${styles.sizes.breakpoint.small}) {
        min-height: auto;
        max-height: auto;
      }

      &:before {
        content: '';
        position: absolute;
        left: 0;
        bottom: -15px;
        width: 30px;
        height: 2px;
        background-color: #464646;
        z-index: 2;
        transition: all 200ms 0s ease;
      }

      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -15px;
        width: 100px;
        height: 2px;
        background-color: #fff;
      }
    }

    a {
      display: block;
      color: #333;

      &:hover {
        h1 {
          &:before {
            width: 100px;
          }
        }
      }
      .story-figure {
        &:hover {
          opacity: 1;
          filter: grayscale(0);
        }
      }
    }

    .story-publish {
      color: #4b4b4b;
    }

    .figure {
      background-repeat: no-repeat;
      background-position: top center;
      background-size: cover;

      &.no-image {
        background-image: url(#{$IMG_PATH}/no-image.svg);
        background-size: 100px auto;
        background-position: center center;
        border: 1px solid #ddd;
      }
    }

    &.other {
      min-height: 610px;

      .story-figure {
        background-position: center center;
        background-size: 100%;

        &.right {
          background-position: center right;
        }

        &.left {
          background-position: center left;
        }

        &.outline {
          border: 1px solid $color-border;

          @media (max-width: ${styles.sizes.breakpoint.small}) {
            margin-top: 10px;
            border-top: 1px solid $color-border;
            border-bottom: 1px solid $color-border;
          }
        }
      }
    }
  }
`
const ArticleWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin: 0 0 50px;

  @media (max-width: ${styles.sizes.breakpoint.small}) {
    grid-template-columns: repeat(1, 1fr);
  }
`
const Article = styled.article`
  .story {
    &-past {
      // opacity: 0;
      // transform: translateY(50px);
      // transition-duration: .6s;

      article {
        position: relative;
        width: 100%;
        min-height: 825px;

        @media #{$small} {
          margin-bottom: 35px;
          &:after {
            content: '⋯';
            display: block;
            text-align: center;
            color: #333;
          }
        }

        &:last-of-type {
          margin-right: 0;

          @media #{$small} {
            margin-bottom: 0;

            &:after {
              content: '';
            }
          }
        }

        h1 {
          position: relative;
          margin: 10px 0 50px;
          min-height: 80px;
          font-family: 'ヒラギノ明朝 ProN W3', HiraMinProN-W3, YuMincho, 游明朝, 'ＭＳ Ｐ明朝', 'MS PMincho', 'MS 明朝',
            serif;

          ${styles.mixins.fontSize(24, 40)}

          letter-spacing: 0.15em;

          @media #{$small} {
            min-height: auto;
            max-height: auto;
          }

          &:before {
            content: '';
            position: absolute;
            left: 0;
            bottom: -15px;
            width: 30px;
            height: 2px;
            background-color: #464646;
            z-index: 2;
            transition: all 200ms 0s ease;
          }

          &:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -15px;
            width: 100px;
            height: 2px;
            background-color: #ddd;
          }
        }

        a {
          display: block;
          color: #333;

          &:hover {
            h1 {
              &:before {
                width: 100px;
              }
            }
          }
          .story-figure {
            &:hover {
              opacity: 1;
              filter: grayscale(0);
            }
          }
        }

        .story-publish {
          color: #4b4b4b;
        }
      }

      &.active {
        opacity: 1;
        transform: translate(0, 0);
      }
    }

    &-category {
      ${styles.mixins.fontSize(12, 12)}

      font-family: ${styles.fonts.raleway};

      color: #4b4b4b;
    }

    &-status {
      li {
        text-align: right;
      }
    }

    &-entrance {
      padding: 13px;
    }

    &-information {
      width: 355px;
      width: 100%;
      margin: auto;

      p {
        ${styles.mixins.fontSize(14, 22)}

        color: #333;

        &:first-letter {
          ${styles.mixins.fontSize(20, 22)}

          color: #111;
        }
      }
    }

    &-publish {
      ${styles.mixins.fontSize(11, 11)}

      color: #b8b8b8;
    }

    &-figure {
      width: 100%;
      height: 250px;
      transition: all 1000ms 0s ease;
      filter: grayscale(100%);

      @media #{$middle} {
        padding-top: 0;
        height: 100vh;
        filter: none;
      }

      &.other {
        background-position: center center;
        background-size: 100%;
      }

      &.outline {
        border: 1px solid #dddddd;

        @media #{$small} {
          border: none;
          border-top: 1px solid $color-border;
        }
      }

      &.right {
        background-position: center right;
      }

      &.left {
        background-position: center left;
      }
    }
  }
`

export default CardSmall

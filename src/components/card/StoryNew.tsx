import Link from 'next/link'
import styled from '@emotion/styled'
import * as gtag from 'lib/gtag'
import styles from 'utils/styles'
import DateFormatter from 'components/Date'

type Props = {
  slug: string
  date: string
  title: string
  excerpt: string
  category: string
  coverEyeCatch: string
}

const StoryNew = ({ slug, date, title, excerpt, category, coverEyeCatch }: Props) => {
  return (
    <Section>
      <Article id={date}>
        <Link as={`/blog/${slug}`} href={`/blog/${slug}`} passHref scroll={false}>
          <Body>
            <span className='story-category'>{category}</span>
            <h1>{title}</h1>
            <Information>
              <ul className='story-status'>
                <li>
                  <span className='story-publish'>
                    <DateFormatter dateString={date} />
                  </span>
                </li>
              </ul>
              <p>{excerpt}</p>
            </Information>
            <div className='btn btn-readmore'>read more</div>
          </Body>
          <Picture>
            <div className='new-image outline' style={{ backgroundImage: `url('${coverEyeCatch}` }}></div>
          </Picture>
        </Link>
      </Article>
    </Section>
  )
}

const Section = styled.section`
  position: relative;
  max-width: 100%;
  height: 580px;
  margin: 50px auto 105px;
  padding: 0 20px;

  @media (max-width: ${styles.sizes.breakpoint.small}) {
    margin-bottom: 52px;
    padding: 0 0px;
    height: auto;

    &:first-of-type {
      margin-top: 0;
    }
  }

  h1 {
    position: relative;
    font-family: 'ヒラギノ明朝 ProN W3', HiraMinProN-W3, YuMincho, 游明朝, 'ＭＳ Ｐ明朝', 'MS PMincho', 'MS 明朝', serif;
    ${styles.mixins.fontSize(24, 40)}

    letter-spacing: 0.15em;
    color: #fff;

    @media (max-width: ${styles.sizes.breakpoint.small}) {
      margin-bottom: 40px;
    }

    a {
      display: block;
      color: #fff;
    }

    &:before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -15px;
      width: 30px;
      height: 2px;
      background-color: #fff;
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
      background-color: #464646;
    }

    &:hover {
      &:before {
        width: 100px;
      }
    }
  }

  .btn-readmore {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 25px;
    margin: auto;

    @media (max-width: ${styles.sizes.breakpoint.small}) {
      position: static;
    }
  }

  .story {
    &-category {
      color: #b7b7b7;
      ${styles.mixins.fontSize(12, 24)}
    }
  }

  .btn {
    display: block;

    &-readmore {
      display: block;
      width: 130px;
      padding: 10px 0 9px;

      ${styles.mixins.fontSize(11, 11)}

      font-family: ${styles.fonts.raleway};

      letter-spacing: 3px;

      text-transform: uppercase;
      text-align: center;
      color: #a1a1a1;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 500ms 0s ease;
    }

    &-viewall {
      width: 230px;
      margin: 0 auto;

      ${styles.mixins.fontSize(13, 13)}

      font-family: ${styles.fonts.raleway};

      letter-spacing: 3px;

      text-transform: uppercase;
      text-align: center;

      a {
        display: block;
        padding: 15px 0 14px;
        background-color: #000;
        border: 1px solid #000;
        color: #a1a1a1;
        font-weight: bold;
        transition: all 500ms 0s ease;

        &:hover {
          background-color: #fff;
          color: #000;
        }

        @media #{$small} {
          font-weight: normal;
        }
      }
    }
  }
`

const Article = styled.article`
  a {
    display: grid;
    grid-template-columns: 380px 1fr;

    @media (max-width: ${styles.sizes.breakpoint.small}) {
      display: flex;
      flex-wrap: wrap;
    }

    &:hover {
      h1 {
        &:before {
          width: 100px;
        }
      }

      .btn-readmore {
        background-color: #fff;
        color: #222222;
      }
    }
  }
`

const Body = styled.div`
  position: relative;
  width: 380px;
  padding: 50px;
  background-color: #222;

  @media (max-width: ${styles.sizes.breakpoint.small}) {
    order: 2;
    width: 100%;
    padding: 30px;
  }
`

const Information = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 85px;
  width: 277px;
  width: calc(277 / 380 * 100%);
  margin: auto;

  @media (max-width: ${styles.sizes.breakpoint.small}) {
    position: static;
    width: 100%;
    margin: 0 0 50px;
  }

  .story {
    &-publish {
      color: #bbbbbb;

      ${styles.mixins.fontSize(12, 24)}

      @media (max-width: ${styles.sizes.breakpoint.small}) {
        ${styles.mixins.fontSize(12, 24)}
      }
    }
  }

  p {
    ${styles.mixins.fontSize(14, 22)}
    color: #bbbbbb;

    &:first-letter {
      ${styles.mixins.fontSize(18, 22)}
      color: #fff;
    }
  }
`

const Picture = styled.div`
  width: 100%;
  height: 580px;
  overflow: hidden;
  background-color: #000;

  .new-image {
    width: 100%;
    height: 580px;
    background-position: center center;
    background-size: cover;
    filter: grayscale(100%);
    transition: all 1500ms 0s ease;

    @media (max-width: ${styles.sizes.breakpoint.small}) {
      order: 1;
      filter: none;
      transition: none;
    }

    &.no-image {
      background: #fff url(#{$IMG_PATH}/no-image.svg) center center no-repeat;
      background-size: 100px auto;
      border: 1px solid #ddd;
    }

    &.outline {
      border: 1px solid #222222;

      @media (max-width: ${styles.sizes.breakpoint.small}) {
        border: none;
        border-top: 1px solid $color-border;
      }
    }

    &.right {
      @media (max-width: ${styles.sizes.breakpoint.small}) {
        background-position: center right;
      }
    }

    &.left {
      @media (max-width: ${styles.sizes.breakpoint.small}) {
        background-position: center left;
      }
    }

    &:hover {
      opacity: 1;
      filter: grayscale(0);
    }
  }
`

export default StoryNew

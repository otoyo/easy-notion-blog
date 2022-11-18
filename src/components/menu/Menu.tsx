import { useContext } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { motion, useAnimation } from 'framer-motion'
import { MenuFlagContext } from 'providers/MenuFlagProvider'
import styles from 'utils/styles'

import animations from 'utils/animations'

const Menu = () => {
  const { openMenu, setOpenMenu } = useContext(MenuFlagContext)
  const controls = useAnimation()

  const onClickMenu = () => {
    setOpenMenu(!openMenu)
    console.log(openMenu)
  }

  controls.start(openMenu ? 'visible' : 'hidden')

  return (
    <motion.div
      className={openMenu ? 'is-open' : ''}
      initial='hidden'
      animate={controls}
      variants={animations.slideRight}
    >
      <Wrapper>
        <Inner>
          <Close onClick={onClickMenu}>
            <span></span>
          </Close>
          <Body>
            <Section>
              <h3>pages</h3>
              <ul>
                <li>
                  <Link href='/profile' passHref>
                    profile
                  </Link>
                </li>
                <li>
                  <Link href='/archives' passHref>
                    archives
                  </Link>
                </li>
              </ul>
            </Section>
          </Body>
        </Inner>
      </Wrapper>
    </motion.div>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 9999;

  &.is-open {
    opacity: 1;
    visibility: visible;
    z-index: 9999;
  }

  &.is-login {
    top: 32px;

    @media #{$middle} {
      top: 45px;
    }
  }
`

const Inner = styled.div`
  position: absolute;
  right: 0;
  width: 100%;
  min-height: 100%;
  background: rgba(0, 0, 0, 0.9);
  transform: translateZ(0);
  overflow: scroll;

  @media (max-width: ${styles.sizes.breakpoint.small}) {
    width: 100%;
    background: rgba(0, 0, 0, 1);
  }
`

const Close = styled.div`
  position: absolute;
  top: 15px;
  right: 17px;
  display: inline-block;
  transition: all 0.4s;
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  cursor: pointer;

  span {
    position: absolute;
    top: 25px;
    right: 15px;
    width: 20px;
    height: 1px;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -webkit-transform: translate3d(-1px, 0, 0) rotate(-45deg);
    transform: translate3d(-1px, 0, 0) rotate(-45deg);
  }
`

const Body = styled.div`
  margin-top: 50px;
  padding: 0 20px;

  & > div {
    margin-bottom: 30px;

    &:last-of-type {
      margin-bottom: 80px;
    }
  }
`

const Section = styled.div`
  h3 {
    position: relative;
    margin: 0 0 20px;
    padding: 0 0 0 5px;
    font-family: ${styles.fonts.raleway};
    font-weight: normal;
    text-transform: capitalize;
    letter-spacing: 0.2em;
    ${styles.mixins.fontSize(18, 23)};
    color: #fff;

    &:before,
    &:after {
      bottom: -5px;
    }

    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 80px;
      height: 1px;
      background-color: #dcdcdc;
      z-index: 2;
    }

    &:after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #404040;
      z-index: 1;
    }
  }

  ul:not(.sns) {
    li {
      margin: 0 0 0.5em 0.5em;
      font-family: ${styles.fonts.raleway};
      text-transform: capitalize;
      letter-spacing: 0.1em;

      a {
        ${styles.mixins.fontSize(15, 15)};
        color: #fff;
        transition: all 400ms 0s ease;

        &:hover {
          color: #404040;
        }
      }

      &:before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        margin-right: 8px;
        border: 1px solid #b19764;
        border-radius: 50%;
        vertical-align: 2px;
      }
    }
  }

  ul.sns {
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }

      a {
        &:hover {
          img {
            opacity: 1;
          }
        }
      }

      img {
        opacity: 0.8;
        transition: all 400ms 0s;
      }
    }
  }
`

export default Menu

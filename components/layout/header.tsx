'use client'

import { useContext } from 'react'
import Link from 'next/link'
import { Metrophobic } from '@next/font/google'
import styled from '@emotion/styled'
import { MenuFlagContext } from 'providers/MenuFlagProvider'
import config from 'utils/config'
import styles from 'utils/styles'

const metrophobic = Metrophobic({
  weight: '400',
})

const Header = () => {
  const { openMenu, setOpenMenu } = useContext(MenuFlagContext)

  const onClickMenu = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <Root>
      <Welcome>
        <h1>
          <Link href='/'>
            {config.info.siteNameFirst} {config.info.siteNameSecond}
          </Link>
        </h1>
        <MenuLine className={openMenu ? 'is-open' : ''} onClick={onClickMenu}>
          <span></span>
        </MenuLine>
      </Welcome>
    </Root>
  )
}

export default Header

const Root = styled.header`
  grid-area: header;
  position: relative;
  border-bottom: 1px solid #000;
  background-color: ${styles.colors.background};
  z-index: 1;

  @media (max-width: ${styles.sizes.breakpoint.small}) {
    border-bottom: none;
  }
`

const Welcome = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 18px 20px 18px;

  @media (max-width: ${styles.sizes.breakpoint.small}) {
    padding: 10px 10px 5px;
  }

  h1 {
    position: relative;
    display: inline-block;
    font-family: ${metrophobic.style.fontFamily};
    font-weight: ${metrophobic.style.fontWeight};
    ${styles.mixins.fontSize(12, 12)}

    letter-spacing: 0.3em;
    text-transform: uppercase;
  }
`

const MenuLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 44px;
  box-sizing: border-box;
  transition: all 0.4s;
  cursor: pointer;

  span {
    display: inline-block;
    width: 20px;
    height: 1px;
    transition: all 0.4s;
    box-sizing: border-box;
    background-color: #000;
  }

  &.is-open {
    span {
      display: none;
    }
  }

  &.active {
    span {
      -webkit-font-smoothing: antialiased;
      -webkit-transform: translate3d(-1px, 0, 0) rotate(-45deg);
      transform: translate3d(-1px, 0, 0) rotate(-45deg);
    }
  }
`

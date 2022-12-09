'use client'

import Link from 'next/link'
import { Metrophobic } from '@next/font/google'
import styled from '@emotion/styled'
import config from 'utils/config'
import styles from 'utils/styles'

const metrophobic = Metrophobic({
  weight: '400',
})

const Header = () => {
  return (
    <Root>
      <Welcome>
        <h1>
          <Link href='/'>
            {config.info.siteNameFirst} {config.info.siteNameSecond}
          </Link>
        </h1>
      </Welcome>
    </Root>
  )
}

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
  padding: 36px 20px;

  @media (max-width: ${styles.sizes.breakpoint.small}) {
    padding: 24px 10px;
  }

  h1 {
    position: relative;
    display: inline-block;
    font-family: ${metrophobic.style.fontFamily};

    ${styles.mixins.fontSize(12, 12)}

    letter-spacing: 0.3em;
    text-transform: uppercase;
  }
`

export default Header

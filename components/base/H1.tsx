import styled from '@emotion/styled'
import styles from 'utils/styles'

type Props = {
  children: React.ReactNode
}

export const H1 = ({ children }: Props) => {
  return <Root>{children}</Root>
}

const Root = styled.h1`
  h1 {
    position: relative;
    margin: 10px 0 50px;
    min-height: 80px;
    font-family: 'ヒラギノ明朝 ProN W3', HiraMinProN-W3, YuMincho, 游明朝, 'ＭＳ Ｐ明朝', 'MS PMincho', 'MS 明朝', serif;
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
`

export default H1

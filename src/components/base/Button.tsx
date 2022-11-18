import styled from '@emotion/styled'
import styles from 'utils/styles'

type Props = {
  children: React.ReactNode
}

export const Button = ({ children }: Props) => {
  return <Root>{children}</Root>
}

export const ButtonLarge = ({ children }: Props) => {
  return <CMButtonLarge>{children}</CMButtonLarge>
}

const Root = styled.div`
  width: 200px;
  margin: 0 auto 50px;
  border: 1px solid #000;
  text-align: center;
  ${styles.mixins.fontSize(14, 14)}

  a {
    display: block;
    padding: 8px;
    transition: color 200ms 0s ease, background-color 200ms 0s ease;

    &:hover {
      color: #fff;
      background-color: #000;
    }
  }
`

const CMButtonLarge = styled.button`
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 25px;
  width: 130px;
  margin: auto;
  padding: 10px 0 9px;

  ${styles.mixins.fontSize(11, 11)}

  font-family: ${styles.fonts.raleway};
  letter-spacing: 3px;
  text-transform: uppercase;
  text-align: center;
  color: #a1a1a1;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 500ms 0s ease;

  @media (max-width: ${styles.sizes.breakpoint.small}) {
    position: static;
  }
`

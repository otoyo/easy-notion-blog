'use client'

import { useContext, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

import { MenuFlagProvider, MenuFlagContext } from 'providers/MenuFlagProvider'
import Menu from 'components/menu/menu'

import Header from 'components/layout/header'
import Footer from 'components/layout/footer'

import 'styles/syntax-coloring.css'
import 'styles/common/global.scss'
import layout from 'styles/layout/layout.module.scss'

import animations from 'utils/animations'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { openMenu, setOpenMenu } = useContext(MenuFlagContext)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      if (openMenu) setOpenMenu(!openMenu)
    }
    const url = pathname + searchParams.toString()
    handleRouteChange()
    // //router.events.on('routeChangeComplete', handleRouteChange)
    // return () => {
    //   //router.events.off('routeChangeComplete', handleRouteChange)
    // }
  }, [pathname, searchParams])

  return (
    <html lang='ja'>
      <body>
        <MenuFlagProvider>
          <div className={layout.global_wrapper}>
            <div className={openMenu ? 'is-open' : ''}>
              <Header />
              <motion.div initial='hidden' animate='visible' variants={animations.fadeIn}>
                <main className={openMenu ? 'blur' : ''}>{children}</main>
              </motion.div>
              <Footer />
            </div>
            <Menu />
          </div>
        </MenuFlagProvider>
      </body>
    </html>
  )
}

export default RootLayout

// const Root = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   width: 100%;
//   min-height: 100vh;
//   transform: translateX(0);
//   transition: transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
//   background-color: ${styles.colors.background};
//   z-index: 2;
//   will-change: auto;

//   @media (max-width: ${styles.sizes.breakpoint.small}) {
//     width: 100%;
//   }
// `

// const Wrapper = styled.div`
//   display: grid;
//   grid:
//     'header' 86px
//     'main' 1fr
//     'footer' 82.5px
//     / 1fr;
//   gap: 8px;
//   height: 100vh;
//   transition: 0.3s ease-in-out;

//   @media (max-width: ${styles.sizes.breakpoint.small}) {
//     grid:
//       'header' 55px
//       'main' 1fr
//       'footer' 82.5px
//       / 1fr;
//     gap: 5px;
//   }

//   &.is-open {
//     overflow: hidden;
//     filter: blur(3px);
//     //transform: translateX(-350px);

//     @media (max-width: ${styles.sizes.breakpoint.small}) {
//       transform: translateX(0);
//     }
//   }
// `

// const Main = styled.main`
//   grid-area: main;
//   position: relative;
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;

//   @media (max-width: ${styles.sizes.breakpoint.small}) {
//     max-width: 100%;
//   }

//   &.scale {
//     .entries {
//       transition: 1s ease-in-out;
//       transform: scale(0.9);
//       filter: blur(4px);
//     }

//     &:before {
//       filter: blur(4px);
//     }
//   }
// `

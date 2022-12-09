import { useContext } from 'react'
import Link from 'next/link'
import { Metrophobic } from '@next/font/google'
import { motion, useAnimation } from 'framer-motion'
import { MenuFlagContext } from 'providers/MenuFlagProvider'
import menu from 'styles/components/menu.module.scss'

import animations from 'utils/animations'

const Menu = () => {
  const { openMenu, setOpenMenu } = useContext(MenuFlagContext)
  const controls = useAnimation()

  const onClickMenu = () => {
    setOpenMenu(!openMenu)
  }

  controls.start(openMenu ? 'visible' : 'hidden')

  return (
    <motion.div
      className={openMenu ? 'is-open' : ''}
      initial='hidden'
      animate={controls}
      variants={animations.slideRight}
    >
      <div className={menu.wrapper}>
        <div className={menu.inner}>
          <div className={menu.close} onClick={onClickMenu}>
            <span></span>
          </div>
          <div className={menu.body}>
            <div className={menu.section}>
              <h3>pages</h3>
              <ul>
                <li>
                  <Link href='/profile' passHref>
                    profile
                  </Link>
                </li>
                <li>
                  <Link href='/blog' passHref>
                    archives
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Menu

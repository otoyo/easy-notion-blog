'use client'

import { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react'

type Props = {
  children: ReactNode
}

export type MenuContextType = {
  openMenu: boolean
  setOpenMenu: Dispatch<SetStateAction<boolean>>
}

export const MenuFlagContext = createContext<MenuContextType>({} as MenuContextType)

export const MenuFlagProvider = (props: Props) => {
  const { children } = props
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  return <MenuFlagContext.Provider value={{ openMenu, setOpenMenu }}>{children}</MenuFlagContext.Provider>
}

export default MenuFlagProvider

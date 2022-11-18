import { Variants } from 'framer-motion'

/** フェードインで表示 */
const slideRight: Variants = {
  hidden: {
    opacity: 0,
    visibility: 'hidden',
  },
  visible: {
    opacity: 1,
    visibility: 'visible',
    transition: {
      duration: 0.3,
    },
  },
}

export default slideRight

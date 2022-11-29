import { Variants } from 'framer-motion'

/** フェードインで表示 */
const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
}

export default fadeIn

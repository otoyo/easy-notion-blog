import Link from 'next/link'

import styles from '../styles/footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <div>
      <span>Powered by </span>
      <Link href="https://github.com/otoyo/easy-notion-blog">
        easy-notion-blog
      </Link>
    </div>
  </footer>
)

export default Footer

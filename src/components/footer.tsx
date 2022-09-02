import ExtLink from './ext-link'

import styles from '../styles/footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <div>
      <ExtLink href="https://thocode.net">
        Thợ Code
      </ExtLink>
      <span>. Powered by </span>
      <ExtLink href="https://github.com/otoyo/easy-notion-blog">
        easy-notion-blog
      </ExtLink>.
    </div>
  </footer>
)

export default Footer

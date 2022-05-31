import ExtLink from './ext-link'

import styles from '../styles/footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.powered}>
      <span>Powered by </span>
      <ExtLink href="https://github.com/otoyo/easy-notion-blog">
        <img src="/title.png"  className={styles.titleLogo}/>
      </ExtLink>
    </div>
  </footer>
)

export default Footer

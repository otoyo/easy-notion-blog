import DocumentHead from '../components/document-head'
import ExtLink from '../components/ext-link'
import styles from '../styles/page.module.css'

const RenderPage = () => (
  <div className={styles.container}>
    <DocumentHead />

    <div className="explanation">
      <p>
        easy-notion-blog powered by{' '}
        <ExtLink href="https://github.com/otoyo/easy-notion-blog">
          otoyo/easy-notion-blog
        </ExtLink>
      </p>
    </div>
  </div>
)

export default RenderPage

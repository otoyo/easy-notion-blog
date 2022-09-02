import { SITE_TITLE, SITE_DESCRIPTION } from '../components/document-head'
import DocumentHead from '../components/document-head'
import ExtLink from '../components/ext-link'
import styles from '../styles/page.module.css'

const RenderPage = () => (
  <div className={styles.container}>
    <DocumentHead />

    <div>
      <h2>Hello, world!</h2>
      <p>Lời quê góp nhặt dông dài</p>
      <p>Mua vui cũng được một trống canh</p>
      <br />
      <p>${SITE_TITLE}, ${SITE_DESCRIPTION}</p>
    </div>
  </div>
)

export default RenderPage

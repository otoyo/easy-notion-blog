import DocumentHead from '../components/document-head'
import styles from '../styles/page.module.css'

// For commit

const RenderPage = () => (
  <div className={styles.container}>
    <DocumentHead />

    <div>
      <h2>Hello, world!</h2>
      <p>Lời quê góp nhặt dông dài</p>
      <p>Mua vui cũng được một trống canh</p>
      <p></p>
      <p>Thợ Code - Code gì cũng được, miễn có lương thiện là được!</p>
    </div>
  </div>
)

export default RenderPage

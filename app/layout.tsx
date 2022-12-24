import Header from '../components/header'
import Footer from '../components/footer'
import '../styles/global.css'
import '../styles/syntax-coloring.css'
import styles from '../styles/shared.module.css'

const RootLayout = ({
  children,
}: {
  children: React.ReactNode,
}) => (
  <html lang="ja" prefix="og: https://ogp.me/ns#">
    <body>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          {children}
        </div>
        <Footer />
      </div>
    </body>
  </html>
)

export default RootLayout

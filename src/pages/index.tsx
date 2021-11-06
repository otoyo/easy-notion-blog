import Header from '../components/header'
import ExtLink from '../components/ext-link'
import sharedStyles from '../styles/shared.module.css'

const RenderPage = () => (
  <>
    <Header titlePre="" />
    <div className={sharedStyles.layout}>
      <div className="explanation">
        <p>
          easy-notion-blog powered by{' '}
          <ExtLink href="https://github.com/otoyo/easy-notion-blog">
            otoyo/easy-notion-blog
          </ExtLink>
        </p>
      </div>
    </div>
  </>
)

export default RenderPage

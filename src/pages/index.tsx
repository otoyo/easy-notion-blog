import Header from '../components/header'
import ExtLink from '../components/ext-link'
import sharedStyles from '../styles/shared.module.css'

const RenderPage = () => (
  <>
    <Header titlePre="" />
    <div className={sharedStyles.layout}>
      <div className="explanation">
        <p>
          my-notion-blog powered by{' '}
          <ExtLink href="https://github.com/otoyo/my-notion-blog">
            otoyo/my-notion-blog
          </ExtLink>
        </p>
      </div>
    </div>
  </>
)

export default RenderPage

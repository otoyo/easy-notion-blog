import dynamic from 'next/dynamic'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'

import { RichText } from '../../lib/notion/interfaces'

import styles from '../../styles/notion-block.module.css'

const Mermaid = dynamic(() => import('./mermaid'))

const Code = ({ block }) => {
  const code = block.Code.Text.map((richText: RichText) => richText.Text.Content).join('')
  const language = block.Code.Language || 'javascript'

  return (
    <div className={styles.code}>
      {language === 'mermaid' ? (
        <Mermaid id={`mermaid-${block.Id}`} definition={code} />
      ) : (
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                code,
                Prism.languages[language.toLowerCase()] ||
                  Prism.languages.javascript
              ),
            }}
          />
        </pre>
      )}
      {block.Code.Caption.length > 0 && block.Code.Caption[0].Text.Content ? (
        <div className={styles.caption}>
          {block.Code.Caption[0].Text.Content}
        </div>
      ) : null}
    </div>
  )
}

export default Code

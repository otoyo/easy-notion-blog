'use client'

import Prism from 'prismjs'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-diff'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-elixir'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-hcl'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-yaml'

import Mermaid from './mermaid'
import { RichText } from '../../lib/notion/interfaces'
import styles from '../../styles/notion-block.module.css'


const Code = ({ block }) => {
  const code = block.Code.RichTexts.map((richText: RichText) => richText.Text.Content).join('')
  const language = block.Code.Language.toLowerCase()
  const grammer = Prism.languages[language.toLowerCase()] || Prism.languages.javascript

  return (
    <div className={styles.code}>
      {language === 'mermaid' ? (
        <Mermaid id={`mermaid-${block.Id}`} definition={code} />
      ) : (
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(code, grammer, language),
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

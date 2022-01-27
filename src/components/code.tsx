import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import blogStyles from '../styles/blog.module.css'

const Code = ({ children, language = 'javascript', caption }) => {
  if (!children) {
    return
  }

  return (
    <>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              children,
              Prism.languages[language.toLowerCase()] ||
                Prism.languages.javascript
            ),
          }}
        />
      </pre>
      {!!caption && caption.length > 0 && caption[0].Text.Content ? (
        <div className={blogStyles.caption}>{caption[0].Text.Content}</div>
      ) : (
        ''
      )}

      <style jsx>{`
        pre {
          tab-size: 2;
        }

        code {
          overflow: auto;
          display: block;
          padding: 0.8rem;
          line-height: 1.5;
          background: #f5f5f5;
          font-size: 0.75rem;
          border-radius: var(--radius);
        }
      `}</style>
    </>
  )
}

export default Code

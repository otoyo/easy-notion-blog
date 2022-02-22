import React from 'react'
import Image from 'next/image'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import TweetEmbed from './tweet-embed'
import Mermaid from './mermaid'
import { LinkPreview } from '@dhaiwat10/react-link-preview'

import styles from '../styles/notion-block.module.css'

const RichText = ({ richText }) => {
  let element = richText.Text.Content

  if (richText.Annotation.Bold) {
    element = <b>{element}</b>
  }
  if (richText.Annotation.Italic) {
    element = <i>{element}</i>
  }
  if (richText.Annotation.Strikethrough) {
    element = <s>{element}</s>
  }
  if (richText.Annotation.Underline) {
    element = <u>{element}</u>
  }
  if (richText.Annotation.Code) {
    element = <code>{element}</code>
  }
  if (richText.Href) {
    element = <a href={richText.Href}>{element}</a>
  }

  return element
}

const Paragraph = ({ block }) => (
  <p>
    {block.RichTexts.map((richText, i) => (
      <RichText richText={richText} key={`paragraph-${block.Id}-${i}`} />
    ))}
  </p>
)

const Heading = ({ block, level = 1 }) => {
  const tag = `h${level + 3}`
  const id = block.RichTexts.map(richText => richText.Text.Content)
    .join()
    .trim()
  const heading = React.createElement(
    tag,
    {},
    block.RichTexts.map(richText => <RichText richText={richText} key={id} />)
  )

  return (
    <a href={`#${id}`} id={id}>
      {heading}
    </a>
  )
}

const Caption = ({ caption }) => {
  if (caption.length === 0 || !caption[0].Text.Content) return null

  return <div className={styles.caption}>{caption[0].Text.Content}</div>
}

const ImageBlock = ({ block }) => (
  <div className={styles.image}>
    <div>
      <Image
        src={
          block.Image.External ? block.Image.External.Url : block.Image.File.Url
        }
        layout="fill"
        objectFit="contain"
        alt="画像が読み込まれない場合はページを更新してみてください。"
      />
    </div>
    <Caption caption={block.Image.Caption} />
  </div>
)

const Code = ({ block }) => {
  const code = block.Code.Text.map(richText => richText.Text.Content).join('')
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
      <Caption caption={block.Code.Caption} />
    </div>
  )
}

const Quote = ({ block }) => (
  <blockquote>
    {block.Quote.Text.map((richText, i) => (
      <RichText richText={richText} key={`quote-${block.Id}-${i}`} />
    ))}
  </blockquote>
)

const Callout = ({ block }) => (
  <div className={styles.callout}>
    <div>{block.Callout.Icon.Emoji}</div>
    <div>
      {block.Callout.RichTexts.map((richText, i) => (
        <RichText richText={richText} key={`callout-${block.Id}-${i}`} />
      ))}
    </div>
  </div>
)

const Embed = ({ block }) => {
  if (/^https:\/\/twitter\.com/.test(block.Embed.Url)) {
    return <TweetEmbed url={block.Embed.Url} />
  } else if (/^https:\/\/gist\.github\.com/.test(block.Embed.Url)) {
    return <LinkPreview url={block.Embed.Url} className={styles.linkPreview} />
  }

  return null
}

const Table = ({ block }) => (
  <table>
    <tbody>
      {block.Table.Rows.map((rowBlock, j) => {
        return (
          <tr key={`${rowBlock.Id}-${j}`}>
            {rowBlock.TableRow.Cells.map((cell, i) => {
              let tag = 'td'
              if (
                (block.Table.HasRowHeader && i === 0) ||
                (block.Table.HasColumnHeader && j === 0)
              ) {
                tag = 'th'
              }

              return React.createElement(
                tag,
                { key: `${rowBlock.Id}-${j}-${i}` },
                cell.RichTexts.map((richText, k) => (
                  <RichText richText={richText} key={`${cell.Id}-${k}`} />
                ))
              )
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
)

const BulletedList = ({ block }) => (
  <ul>
    {block.ListItems.map(listItem => {
      return (
        <li key={`bulleted-list-item-${listItem.Id}`}>
          {listItem.RichTexts.map((richText, i) => (
            <RichText
              richText={richText}
              key={`bulleted-list-item-${listItem.Id}-${i}`}
            />
          ))}
        </li>
      )
    })}
  </ul>
)

const NumberedList = ({ block }) => (
  <ol>
    {block.ListItems.map(listItem => {
      return (
        <li key={`numbered-list-item-${listItem.Id}`}>
          {listItem.RichTexts.map((richText, i) => (
            <RichText
              richText={richText}
              key={`numbered-list-item-${listItem.Id}-${i}`}
            />
          ))}
        </li>
      )
    })}
  </ol>
)

const NotionBlock = ({ block }) => {
  if (block.Type === 'paragraph') {
    return <Paragraph block={block} />
  } else if (block.Type === 'heading_1') {
    return <Heading block={block} level={1} />
  } else if (block.Type === 'heading_2') {
    return <Heading block={block} level={2} />
  } else if (block.Type === 'heading_3') {
    return <Heading block={block} level={3} />
  } else if (block.Type === 'image') {
    return <ImageBlock block={block} />
  } else if (block.Type === 'code') {
    return <Code block={block} />
  } else if (block.Type === 'quote') {
    return <Quote block={block} />
  } else if (block.Type === 'callout') {
    return <Callout block={block} />
  } else if (block.Type === 'embed') {
    return <Embed block={block} />
  } else if (block.Type === 'bookmark') {
    return (
      <LinkPreview
        url={block.Bookmark.Url}
        className={styles.linkPreview}
        descriptionLength={60}
      />
    )
  } else if (block.Type === 'link_preview') {
    return (
      <LinkPreview
        url={block.LinkPreview.Url}
        className={styles.linkPreview}
        descriptionLength={60}
      />
    )
  } else if (block.Type === 'divider') {
    return <hr className="divider" />
  } else if (block.Type === 'table') {
    return <Table block={block} />
  } else if (block.Type === 'bulleted_list') {
    return <BulletedList block={block} />
  } else if (block.Type === 'numbered_list') {
    return <NumberedList block={block} />
  }

  return null
}

export default NotionBlock

import React from 'react'
import dynamic from 'next/dynamic'

const Code = dynamic(() => import('./notion-blocks/code'))
const Embed = dynamic(() => import('./notion-blocks/embed'))
const Bookmark = dynamic(() => import('./notion-blocks/bookmark'))

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
  if (richText.Annotation.Color && richText.Annotation.Color !== 'default') {
    element = (
      <span className={colorClass(richText.Annotation.Color)}>{element}</span>
    )
  }
  if (richText.Annotation.Code) {
    element = <code>{element}</code>
  }
  if (richText.Href) {
    element = <a href={richText.Href}>{element}</a>
  }

  return element
}

const colorClass = color => {
  switch (color) {
    case 'gray':
      return styles.gray
    case 'brown':
      return styles.brown
    case 'orange':
      return styles.orange
    case 'yellow':
      return styles.yellow
    case 'green':
      return styles.green
    case 'blue':
      return styles.blue
    case 'purple':
      return styles.purple
    case 'pink':
      return styles.pink
    case 'red':
      return styles.red
    case 'gray_background':
      return styles.grayBackground
    case 'brown_background':
      return styles.brownBackground
    case 'orange_background':
      return styles.orangeBackground
    case 'yellow_background':
      return styles.yellowBackground
    case 'green_background':
      return styles.greenBackground
    case 'blue_background':
      return styles.blueBackground
    case 'purple_background':
      return styles.purpleBackground
    case 'pink_background':
      return styles.pinkBackground
    case 'red_background':
      return styles.redBackground
  }
  return null
}

const Paragraph = ({ block }) => (
  <p className={colorClass(block.Paragraph.Color)}>
    {block.Paragraph.RichTexts.map((richText, i) => (
      <RichText richText={richText} key={`paragraph-${block.Id}-${i}`} />
    ))}
  </p>
)

const Heading1 = ({ block }) => <Heading heading={block.Heading1} level={1} />
const Heading2 = ({ block }) => <Heading heading={block.Heading2} level={2} />
const Heading3 = ({ block }) => <Heading heading={block.Heading3} level={3} />

const Heading = ({ heading, level = 1 }) => {
  const tag = `h${level + 3}`
  const id = heading.RichTexts.map(richText => richText.Text.Content)
    .join()
    .trim()
  const htag = React.createElement(
    tag,
    { className: colorClass(heading.Color) },
    heading.RichTexts.map(richText => <RichText richText={richText} key={id} />)
  )

  return (
    <a href={`#${id}`} id={id}>
      {htag}
    </a>
  )
}

const ImageBlock = ({ block }) => (
  <figure className={styles.image}>
    <div>
      <img
        src={
          block.Image.External
            ? block.Image.External.Url
            : `/notion_images/${block.Id}.png`
        }
        alt="画像が読み込まれない場合はページを更新してみてください。"
      />
    </div>
    {block.Image.Caption.length > 0 && block.Image.Caption[0].Text.Content ? (
      <figcaption className={styles.caption}>
        {block.Image.Caption[0].Text.Content}
      </figcaption>
    ) : null}
  </figure>
)

const Quote = ({ block }) => (
  <blockquote className={colorClass(block.Quote.Color)}>
    {block.Quote.Text.map((richText, i) => (
      <RichText richText={richText} key={`quote-${block.Id}-${i}`} />
    ))}
  </blockquote>
)

const Callout = ({ block }) => {
  const color = colorClass(block.Callout.Color)
  const className = color ? `${styles.callout} ${color}` : styles.callout

  return (
    <div className={className}>
      <div>{block.Callout.Icon.Emoji}</div>
      <div>
        {block.Callout.RichTexts.map((richText, i) => (
          <RichText richText={richText} key={`callout-${block.Id}-${i}`} />
        ))}
      </div>
    </div>
  )
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

const List = ({ block }) => {
  if (block.Type === 'bulleted_list') {
    return (
      <ul>
        <BulletedListItems blocks={block.ListItems} />
      </ul>
    )
  }
  return (
    <ol>
      <NumberedListItems blocks={block.ListItems} />
    </ol>
  )
}

const BulletedListItems = ({ blocks }) =>
  blocks
    .filter(b => b.Type === 'bulleted_list_item')
    .map(listItem => (
      <li
        key={`bulleted-list-item-${listItem.Id}`}
        className={colorClass(listItem.BulletedListItem.Color)}
      >
        {listItem.BulletedListItem.RichTexts.map((richText, i) => (
          <RichText
            richText={richText}
            key={`bulleted-list-item-${listItem.Id}-${i}`}
          />
        ))}
        {listItem.HasChildren ? (
          <ul>
            <BulletedListItems blocks={listItem.BulletedListItem.Children} />
          </ul>
        ) : null}
      </li>
    ))

const NumberedListItems = ({ blocks, level = 1 }) =>
  blocks
    .filter(b => b.Type === 'numbered_list_item')
    .map(listItem => (
      <li
        key={`numbered-list-item-${listItem.Id}`}
        className={colorClass(listItem.NumberedListItem.Color)}
      >
        {listItem.NumberedListItem.RichTexts.map((richText, i) => (
          <RichText
            richText={richText}
            key={`numbered-list-item-${listItem.Id}-${i}`}
          />
        ))}
        {listItem.HasChildren ? (
          level % 3 === 0 ? (
            <ol type="1">
              <NumberedListItems
                blocks={listItem.NumberedListItem.Children}
                level={level + 1}
              />
            </ol>
          ) : level % 3 === 1 ? (
            <ol type="a">
              <NumberedListItems
                blocks={listItem.NumberedListItem.Children}
                level={level + 1}
              />
            </ol>
          ) : (
            <ol type="i">
              <NumberedListItems
                blocks={listItem.NumberedListItem.Children}
                level={level + 1}
              />
            </ol>
          )
        ) : null}
      </li>
    ))

const NotionBlock = ({ block }) => {
  if (block.Type === 'paragraph') {
    return <Paragraph block={block} />
  } else if (block.Type === 'heading_1') {
    return <Heading1 block={block} />
  } else if (block.Type === 'heading_2') {
    return <Heading2 block={block} />
  } else if (block.Type === 'heading_3') {
    return <Heading3 block={block} />
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
  } else if (block.Type === 'bookmark' || block.Type === 'link_preview') {
    return <Bookmark block={block} />
  } else if (block.Type === 'divider') {
    return <hr className="divider" />
  } else if (block.Type === 'table') {
    return <Table block={block} />
  } else if (block.Type === 'bulleted_list' || block.Type === 'numbered_list') {
    return <List block={block} />
  }

  return null
}

export default NotionBlock

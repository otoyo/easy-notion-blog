import React from 'react'
import * as interfaces from '../lib/notion/interfaces'

import Code from './notion-blocks/code'
import Embed from './notion-blocks/embed'
import Bookmark from './notion-blocks/bookmark'
import Video from './notion-blocks/video'
import ImageBlock from './notion-blocks/image-block'
import InlineEquation from './notion-blocks/inline-equation'
import BlockEquation from './notion-blocks/block-equation'

import styles from '../styles/notion-block.module.css'

const RichText = ({ richText }) => {
  let element
  if (richText.Text) {
    element = richText.Text.Content
  } else if (richText.Equation) {
    element = <InlineEquation equation={richText.Equation} />
  } else {
    element = null
  }

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

const colorClass = (color: string) => {
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
    {block.Paragraph.RichTexts.map((richText: interfaces.RichText, i: number) => (
      <RichText richText={richText} key={`paragraph-${block.Id}-${i}`} />
    ))}
  </p>
)

const Heading1 = ({ block }) => <Heading heading={block.Heading1} level={1} />
const Heading2 = ({ block }) => <Heading heading={block.Heading2} level={2} />
const Heading3 = ({ block }) => <Heading heading={block.Heading3} level={3} />

const Heading = ({ heading, level = 1 }) => {
  const tag = `h${level + 3}`
  const id = buildHeadingId(heading)
  const htag = React.createElement(
    tag,
    { className: colorClass(heading.Color) },
    heading.RichTexts.map((richText: interfaces.RichText) => <RichText richText={richText} key={id} />)
  )

  return (
    <a href={`#${id}`} id={id}>
      {htag}
    </a>
  )
}

const buildHeadingId = heading => heading.RichTexts.map((richText: interfaces.RichText) => richText.Text.Content).join().trim()

const TableOfContents = ({ block, blocks }) => {
  const headings = blocks.filter((b: interfaces.Block) => b.Type === 'heading_1' || b.Type === 'heading_2' || b.Type === 'heading_3')
  return (
    <div className={styles.tableOfContents}>
      {headings.map((headingBlock: interfaces.Block) => {
        const heading = headingBlock.Heading1 || headingBlock.Heading2 || headingBlock.Heading3

        let indentClass = ''
        if (headingBlock.Type === 'heading_2') {
          indentClass = 'indent-1'
        } else if (headingBlock.Type === 'heading_3') {
          indentClass = 'indent-2'
        }

        return (
          <a href={`#${buildHeadingId(heading)}`} className={`${colorClass(block.TableOfContents.Color)} ${styles[indentClass]}`} key={headingBlock.Id}>
            <div key={headingBlock.Id}>
              {heading.RichTexts.map((richText: interfaces.RichText) => richText.PlainText).join('')}
            </div>
          </a>
        )
      })}
    </div>
  )
}

const Quote = ({ block }) => (
  <blockquote className={colorClass(block.Quote.Color)}>
    {block.Quote.RichTexts.map((richText: interfaces.RichText, i: number) => (
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
        {block.Callout.RichTexts.map((richText: interfaces.RichText, i: number) => (
          <RichText richText={richText} key={`callout-${block.Id}-${i}`} />
        ))}
      </div>
    </div>
  )
}

const Table = ({ block }) => (
  <div className={styles.table}>
    <table>
      <tbody>
        {block.Table.Rows.map((tableRow: interfaces.TableRow, j: number) => {
          return (
            <tr key={`${tableRow.Id}-${j}`}>
              {tableRow.Cells.map((cell: interfaces.TableCell, i: number) => {
                let tag = 'td'
                if (
                  (block.Table.HasRowHeader && i === 0) ||
                  (block.Table.HasColumnHeader && j === 0)
                ) {
                  tag = 'th'
                }

                return React.createElement(
                  tag,
                  { key: `${tableRow.Id}-${j}-${i}` },
                  cell.RichTexts.map((richText: interfaces.RichText, k: number) => (
                    <RichText richText={richText} key={`${tableRow.Id}-${j}-${i}-${k}`} />
                  ))
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

const ColumnList = ({ block, blocks }) => (
  <div className={styles.columnList}>
    {block.ColumnList.Columns.map((column: interfaces.Column) => (
      <div key={column.Id}>
        {column.Children.map((b: interfaces.Block) => (
          <NotionBlock block={b} blocks={blocks} key={b.Id} />
        ))}
      </div>
    ))}
  </div>
)

const List = ({ block }) => {
  if (block.Type === 'bulleted_list') {
    return (
      <ul>
        <BulletedListItems blocks={block.ListItems} />
      </ul>
    )
  } else if (block.Type == 'numbered_list') {
    return (
      <ol>
        <NumberedListItems blocks={block.ListItems} />
      </ol>
    )
  }

  return (
    <div className={styles.toDo}>
      <ToDoItems blocks={block.ListItems} />
    </div>
  )
}

const BulletedListItems = ({ blocks }) =>
  blocks
    .filter((b: interfaces.Block) => b.Type === 'bulleted_list_item')
    .map((listItem: interfaces.Block) => (
      <li
        key={`bulleted-list-item-${listItem.Id}`}
        className={colorClass(listItem.BulletedListItem.Color)}
      >
        {listItem.BulletedListItem.RichTexts.map((richText: interfaces.RichText, i: number) => (
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
    .filter((b: interfaces.Block) => b.Type === 'numbered_list_item')
    .map((listItem: interfaces.Block) => (
      <li
        key={`numbered-list-item-${listItem.Id}`}
        className={colorClass(listItem.NumberedListItem.Color)}
      >
        {listItem.NumberedListItem.RichTexts.map((richText: interfaces.RichText, i: number) => (
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

const ToDoItems = ({ blocks }) =>
  blocks
    .filter((b: interfaces.Block) => b.Type === 'to_do')
    .map((listItem: interfaces.Block) => (
      <div key={`to-do-item-${listItem.Id}`}>
        <input type="checkbox" defaultChecked={listItem.ToDo.Checked} />
        {listItem.ToDo.RichTexts.map((richText: interfaces.RichText, i: number) => (
          <RichText
            richText={richText}
            key={`to-do-item-${listItem.Id}-${i}`}
          />
        ))}
        {listItem.HasChildren ? (
          <ul>
            <ToDoItems blocks={listItem.ToDo.Children} />
          </ul>
        ) : null}
      </div>
    ))

const SyncedBlock = ({ block }) => <NotionBlocks blocks={block.SyncedBlock.Children} />

const Toggle = ({ block }) => (
  <details className={styles.toggle}>
    <summary>
      {block.Toggle.RichTexts.map((richText: interfaces.RichText, i: number) => (
        <RichText richText={richText} key={`summary-${block.Id}-${i}`} />
      ))}
    </summary>
    <div>
      <NotionBlocks blocks={block.Toggle.Children} />
    </div>
  </details>
)

const NotionBlock = ({ block, blocks }) => {
  if (block.Type === 'paragraph') {
    return <Paragraph block={block} />
  } else if (block.Type === 'heading_1') {
    return <Heading1 block={block} />
  } else if (block.Type === 'heading_2') {
    return <Heading2 block={block} />
  } else if (block.Type === 'heading_3') {
    return <Heading3 block={block} />
  } else if (block.Type === 'table_of_contents') {
    return <TableOfContents block={block} blocks={blocks} />
  } else if (block.Type === 'image') {
    return <ImageBlock block={block} />
  } else if (block.Type === 'video') {
    return <Video block={block} />
  } else if (block.Type === 'code') {
    return <Code block={block} />
  } else if (block.Type === 'quote') {
    return <Quote block={block} />
  } else if (block.Type === 'equation') {
    return <BlockEquation block={block} />
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
  } else if (block.Type === 'column_list') {
    return <ColumnList block={block} blocks={blocks} />
  } else if (block.Type === 'bulleted_list' || block.Type === 'numbered_list' || block.Type === 'to_do') {
    return <List block={block} />
  } else if (block.Type === 'synced_block') {
    return <SyncedBlock block={block} />
  } else if (block.Type === 'toggle') {
    return <Toggle block={block} />
  }

  return null
}

const NotionBlocks = ({ blocks }) => (
  <>
    {wrapListItems(blocks).map((block: interfaces.Block, i: number) => (
      <NotionBlock block={block} blocks={blocks} key={`block-${i}`} />
    ))}
  </>
)

const wrapListItems = (blocks: Array<interfaces.Block>) =>
  blocks.reduce((arr, block: interfaces.Block, i: number) => {
    const isBulletedListItem = block.Type === 'bulleted_list_item'
    const isNumberedListItem = block.Type === 'numbered_list_item'
    const isToDo = block.Type === 'to_do'

    if (!isBulletedListItem && !isNumberedListItem && !isToDo) return arr.concat(block)

    let listType = ''
    if (isBulletedListItem) {
      listType = 'bulleted_list'
    } else if (isNumberedListItem) {
      listType = 'numbered_list'
    } else {
      listType = 'to_do'
    }

    if (i === 0) {
      const list: interfaces.List = {
        Type: listType,
        ListItems: [block],
      }
      return arr.concat(list)
    }

    const prevList = arr[arr.length - 1]

    if (
      (isBulletedListItem && prevList.Type !== 'bulleted_list') ||
      (isNumberedListItem && prevList.Type !== 'numbered_list') ||
      (isToDo && prevList.Type !== 'to_do')
    ) {
      const list: interfaces.List = {
        Type: listType,
        ListItems: [block],
      }
      return arr.concat(list)
    }

    prevList.ListItems.push(block)

    return arr
  }, [])

export default NotionBlocks

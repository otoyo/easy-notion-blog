import React from 'react'
import dynamic from 'next/dynamic'

// const RichText = dynamic(() => import('./notion-block'))
// const Heading = dynamic(() => import('./notion-block'))
const Heading1 = dynamic(() => import('./notion-block'))
const Heading2 = dynamic(() => import('./notion-block'))
const Heading3 = dynamic(() => import('./notion-block'))
// const RichText = ({ richText }) => {
//     let element = richText.Text.Content

//     if (richText.Annotation.Bold) {
//       element = <b>{element}</b>
//     }
//     if (richText.Annotation.Italic) {
//       element = <i>{element}</i>
//     }
//     if (richText.Annotation.Strikethrough) {
//       element = <s>{element}</s>
//     }
//     if (richText.Annotation.Underline) {
//       element = <u>{element}</u>
//     }
//     if (richText.Annotation.Code) {
//       element = <code>{element}</code>
//     }
//     if (richText.Href) {
//       element = <a href={richText.Href}>{element}</a>
//     }

//     return element
//   }
// const Heading1 = ({ block }) => <Heading heading={block.Heading1} level={1} />
// const Heading2 = ({ block }) => <Heading heading={block.Heading2} level={2} />
// const Heading3 = ({ block }) => <Heading heading={block.Heading3} level={3} />

// const Heading = ({ heading, level = 1 }) => {
//     const tag = `h${level + 3}`
//     const id = heading.RichTexts.map(richText => richText.Text.Content)
//       .join()
//       .trim()
//     const htag = React.createElement(
//       tag,
//     //   { className: colorClass(heading.Color) },
//       heading.RichTexts.map(richText => <RichText richText={richText} key={id} />)
//     )

//     return (
//       <a href={`#${id}`} id={id}>
//         {htag}
//       </a>
//     )
//   }

const ContentIndex = ({ block }) => {
  if (block.Type === 'heading_1') {
    return <Heading1 block={block} />
  } else if (block.Type === 'heading_2') {
    return <Heading2 block={block} />
  } else if (block.Type === 'heading_3') {
    return <Heading3 block={block} />
  }
  return null
}

export default ContentIndex

import React from 'react'
import components from '../../components/dynamic'

function applyTags(tags = [], children, noPTag = false, key) {
  let child = children

  for (const tag of tags) {
    const props: { [key: string]: any } = { key }
    let tagName = tag[0]

    if (noPTag && tagName === 'p') tagName = React.Fragment
    if (tagName === 'a') {
      props.href = tag[1]
    }

    child = React.createElement(components[tagName] || tagName, props, child)
  }
  return child
}

export function textBlock(block, noPTag, mainKey) {
  const children = []
  let key = 0

  if (block.RichTexts.length === 0) {
    return React.createElement(
      noPTag ? React.Fragment : components.p,
      { key: mainKey },
      ...children,
      noPTag
    )
  }

  for (const richText of block.RichTexts) {
    let tags = []
    key++

    if (richText.Annotation.Bold) {
      tags.push(['b'])
    }
    if (richText.Annotation.Italic) {
      tags.push(['i'])
    }
    if (richText.Annotation.Strikethrough) {
      tags.push(['strike'])
    }
    if (richText.Annotation.Underline) {
      tags.push(['u'])
    }
    if (richText.Annotation.Code) {
      tags.push(['code'])
    }
    if (!!richText.Href) {
      tags.push(['a', richText.Href])
    }

    children.push(applyTags(tags, richText.Text.Content, noPTag, key))
  }

  return React.createElement(
    noPTag ? React.Fragment : components.p,
    { key: mainKey },
    ...children,
    noPTag
  )
}

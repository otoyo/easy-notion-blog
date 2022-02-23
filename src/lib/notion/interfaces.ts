export interface Post {
  PageId: string
  Title: string
  Slug: string
  Date: string
  Tags: string[]
  Excerpt: string
  OGImage: string
  Rank: number
}

export interface Block {
  Id: string
  Type: string
  HasChildren: boolean
  Children?: Block[]
  RichTexts?: RichText[]
  Image?: Image
  Code?: Code
  Quote?: Quote
  Callout?: Callout
  Embed?: Embed
  Bookmark?: Bookmark
  LinkPreview?: LinkPreview
  Table?: Table
  TableRow?: TableRow
}

export interface Image {
  Caption: RichText[]
  Type: string
  File?: File
  External?: External
  Width?: number
  Height?: number
}

export interface File {
  Url: string
}

export interface External {
  Url: string
}

export interface Code {
  Caption: RichText[]
  Text: RichText[]
  Language: string
}

export interface Quote {
  Text: RichText[]
}

export interface Callout {
  RichTexts: RichText[]
  Icon: Icon
}

export interface Embed {
  Url: string
}

export interface Bookmark {
  Url: string
}

export interface LinkPreview {
  Url: string
}

export interface Table {
  TableWidth: number
  HasColumnHeader: boolean
  HasRowHeader: boolean
  Rows: Block[]
}

export interface TableRow {
  Cells: TableCell[]
}

export interface TableCell {
  RichTexts: RichText[]
}

export interface List {
  Type: string
  ListItems: Block[]
}

export interface RichText {
  Text: Text
  Annotation: Annotation
  PlainText: string
  Href?: string
}

export interface Text {
  Content: string
  Link?: Link
}

export interface Icon {
  Emoji: string
}

export interface Annotation {
  Bold: boolean
  Italic: boolean
  Strikethrough: boolean
  Underline: boolean
  Code: boolean
  Color: string
}

export interface Link {
  Url: string
}

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

  Paragraph?: Paragraph
  Heading1?: Heading1
  Heading2?: Heading2
  Heading3?: Heading3
  BulletedListItem?: BulletedListItem
  NumberedListItem?: NumberedListItem
  Image?: Image
  Code?: Code
  Quote?: Quote
  Equation?: Equation
  Callout?: Callout
  Embed?: Embed
  Video?: Video
  Bookmark?: Bookmark
  LinkPreview?: LinkPreview
  Table?: Table
  TableRow?: TableRow
}

export interface Paragraph {
  RichTexts: RichText[]
  Color: string
  Children?: Block[]
}

export interface Heading1 {
  RichTexts: RichText[]
  Color: string
}

export interface Heading2 {
  RichTexts: RichText[]
  Color: string
}

export interface Heading3 {
  RichTexts: RichText[]
  Color: string
}

export interface BulletedListItem {
  RichTexts: RichText[]
  Color: string
  Children?: Block[]
}

export interface NumberedListItem {
  RichTexts: RichText[]
  Color: string
  Children?: Block[]
}

export interface Image {
  Caption: RichText[]
  Type: string
  File?: File
  External?: External
  Width?: number
  Height?: number
}

export interface Video {
  Type: string
  External?: External
}

export interface File {
  Url: string
  ExpiryTime?: string
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
  Color: string
}

export interface Equation {
  Expression: string
}

export interface Callout {
  RichTexts: RichText[]
  Icon: Icon
  Color: string
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
  Text?: Text
  Annotation: Annotation
  PlainText: string
  Href?: string
  Equation?: Equation
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

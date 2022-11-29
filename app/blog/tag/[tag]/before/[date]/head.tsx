import DocumentHead from '../../../../../../components/document-head'

const BlogTagBeforeDateHead = async ({ params: { tag: encodedTag, date: encodedDate } }) => {
  const tag = decodeURIComponent(encodedTag)
  const date = decodeURIComponent(encodedDate)

  return (
    <DocumentHead description={`Posts in ${tag} before ${date.split('T')[0]}`} />
  )
}

export default BlogTagBeforeDateHead

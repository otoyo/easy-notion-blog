import DocumentHead from '../../../../components/document-head'

const BlogTagHead = async ({ params: { tag: encodedTag } }) => {
  const tag = decodeURIComponent(encodedTag)

  return (
    <DocumentHead description={`Posts in ${tag}`} />
  )
}

export default BlogTagHead

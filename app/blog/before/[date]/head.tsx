import DocumentHead from '../../../../components/document-head'

const BlogBeforeDateHead = async ({ params: { date: encodedDate } }) => {
  const date = decodeURIComponent(encodedDate)

  return (
    <DocumentHead description={`Post before ${date.split('T')[0]}`} />
  )
}

export default BlogBeforeDateHead

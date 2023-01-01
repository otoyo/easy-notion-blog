import { getPostBySlug } from '../../../lib/notion/client'
import { getBlogLink } from '../../../lib/blog-helpers'
import DocumentHead from '../../../components/document-head'

const BlogSlugHead = async ({ params: { slug } }) => {
  const post = await getPostBySlug(slug)

  return (
    <DocumentHead
      title={post.Title}
      description={post.Excerpt}
      path={getBlogLink(post.Slug)}
    />
  )
}

export default BlogSlugHead

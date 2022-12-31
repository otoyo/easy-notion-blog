import { NEXT_PUBLIC_URL } from '../../server-constants'
import { getPostBySlug } from '../../../lib/notion/client-through-cache'
import { getBlogLink } from '../../../lib/blog-helpers'
import DocumentHead from '../../../components/document-head'

const BlogSlugHead = async ({ params: { slug } }) => {
  const post = await getPostBySlug(slug)

  return (
    <DocumentHead
      title={post.Title}
      description={post.Excerpt}
      path={getBlogLink(post.Slug)}
      urlOgImage={NEXT_PUBLIC_URL && post.OGImage && new URL(`/api/og-image/${post.Slug}`, NEXT_PUBLIC_URL).toString()}
    />
  )
}

export default BlogSlugHead

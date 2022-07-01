jest.mock('../../../src/lib/notion/blog-index-cache')

import { render, waitFor } from '@testing-library/react'
import RenderPost from '../../../src/pages/blog/[slug]'

import {
  getPosts,
  getAllPosts,
  getRankedPosts,
  getPostBySlug,
  getPostsByTag,
  getAllTags,
  getAllBlocksByBlockId,
} from '../../../src/lib/notion/client'

const slug = 'supported-blocks'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: `/blog/${slug}`,
      pathname: '/blog/[slug]',
    }
  },
}))

describe('RenderPost', () => {
  it('renders the page unchanged', async () => {
    const post = await getPostBySlug(slug)
    const blocks = await getAllBlocksByBlockId(post.PageId)
    const rankedPosts = await getRankedPosts()
    const recentPosts = await getPosts(5)
    const tags = await getAllTags()
    const sameTagPosts = (await getPostsByTag(post.Tags[0], 6)).filter(
      p => p.Slug !== post.Slug
    )
    const fallback = {}
    fallback[slug] = blocks

    const { container } = render(
      <RenderPost
        slug={slug}
        post={post}
        rankedPosts={rankedPosts}
        recentPosts={recentPosts}
        sameTagPosts={sameTagPosts}
        tags={tags}
        fallback={fallback}
      />
    )
    await waitFor(() => {
      expect(container).toMatchSnapshot()
    })
  })
})

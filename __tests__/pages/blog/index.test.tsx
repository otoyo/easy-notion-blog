jest.mock('../../../src/lib/notion/blog-index-cache')

import { render } from '@testing-library/react'
import RenderPosts from '../../../src/pages/blog/index'

import {
  getPosts,
  getFirstPost,
  getRankedPosts,
  getAllTags,
} from '../../../src/lib/notion/client'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/blog',
      pathname: '/blog',
    }
  },
}))

describe('RenderPosts', () => {
  it('renders the page unchanged', async () => {
    const posts = await getPosts()
    const firstPost = await getFirstPost()
    const rankedPosts = await getRankedPosts()
    const tags = await getAllTags()

    const { container } = render(
      <RenderPosts
        posts={posts}
        firstPost={firstPost}
        rankedPosts={rankedPosts}
        tags={tags}
      />
    )
    expect(container).toMatchSnapshot()
  })
})

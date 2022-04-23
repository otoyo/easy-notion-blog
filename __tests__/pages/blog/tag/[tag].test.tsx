jest.mock('../../../../src/lib/notion/blog-index-cache')

import { render } from '@testing-library/react'
import RenderPostsByTags from '../../../../src/pages/blog/tag/[tag]'

import {
  getPosts,
  getPostsByTag,
  getRankedPosts,
  getAllTags,
} from '../../../../src/lib/notion/client'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/blog/tag/Diary',
      pathname: '/blog/tag/[tag]',
    }
  },
}))

describe('RenderPostsByTags', () => {
  it('renders the page unchanged', async () => {
    const tag = 'Diary'
    const posts = await getPostsByTag(tag)
    const rankedPosts = await getRankedPosts()
    const recentPosts = await getPosts(5)
    const tags = await getAllTags()

    const { container } = render(
      <RenderPostsByTags
        tag={tag}
        posts={posts}
        rankedPosts={rankedPosts}
        rcentPosts={recentPosts}
        tags={tags}
        redirect={null}
      />
    )
    expect(container).toMatchSnapshot()
  })
})

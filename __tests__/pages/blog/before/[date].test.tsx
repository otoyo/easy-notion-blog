jest.mock('../../../../src/lib/notion/blog-index-cache')

import { render } from '@testing-library/react'
import RenderPostsBeforeDate from '../../../../src/pages/blog/before/[date]'

import { NUMBER_OF_POSTS_PER_PAGE } from '../../../../src/lib/notion/server-constants'
import {
  getPosts,
  getRankedPosts,
  getPostsBefore,
  getFirstPost,
  getAllTags,
} from '../../../../src/lib/notion/client'

const date = '2022-01-01'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: `/blog/before/${date}`,
      pathname: '/blog/before/[date]',
    }
  },
}))

describe('RenderPostsBeforeDate', () => {
  it('renders the page unchanged', async () => {
    const posts = await getPostsBefore(date, NUMBER_OF_POSTS_PER_PAGE)
    const firstPost = await getFirstPost()
    const rankedPosts = await getRankedPosts()
    const tags = await getAllTags()

    const { container } = render(
      <RenderPostsBeforeDate
        date={date}
        posts={posts}
        firstPost={firstPost}
        rankedPosts={rankedPosts}
        tags={tags}
        redirect={null}
      />
    )
    expect(container).toMatchSnapshot()
  })
})

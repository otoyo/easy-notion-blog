import { render } from '@testing-library/react'
import RenderPage from '../../src/pages/index'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
      pathname: '/',
    }
  },
}))

describe('RenderPage', () => {
  it('renders the page unchanged', () => {
    const { container } = render(<RenderPage />)
    expect(container).toMatchSnapshot()
  })
})

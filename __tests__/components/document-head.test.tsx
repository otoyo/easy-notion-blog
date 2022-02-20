import { render } from '@testing-library/react'
import DocumentHead from '../../src/components/document-head'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
      pathname: '/',
    }
  },
}))

const mockNextPublicURL = jest.fn()
jest.mock('../../src/lib/notion/server-constants', () => ({
  get NEXT_PUBLIC_URL() {
    return mockNextPublicURL()
  },
}))

describe('DocumentHead', () => {
  describe('with NEXT_PUBLIC_URL', () => {
    mockNextPublicURL.mockReturnValue('http://localhost')

    it('renders the component', () => {
      expect(() => {
        render(<DocumentHead />)
      }).not.toThrow()
    })
  })

  describe('without NEXT_PUBLIC_URL', () => {
    mockNextPublicURL.mockReturnValue(undefined)

    it('renders the component', () => {
      expect(() => {
        render(<DocumentHead />)
      }).not.toThrow()
    })
  })
})

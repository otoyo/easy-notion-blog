import React from 'react';
import { createRoot } from 'react-dom/client';
import DocumentHead from '../../components/document-head'

const mockNextPublicURL = jest.fn()
jest.mock('../../app/server-constants', () => ({
  get NEXT_PUBLIC_URL() {
    return mockNextPublicURL()
  },
}))

let container: Element

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container);
  container = null;
})

describe('DocumentHead', () => {
  describe('with NEXT_PUBLIC_URL', () => {
    mockNextPublicURL.mockReturnValue('http://localhost')

    it('renders the component', () => {
      expect(() => {
        createRoot(container).render(<DocumentHead />)
      }).not.toThrow()
    })
  })

  describe('without NEXT_PUBLIC_URL', () => {
    mockNextPublicURL.mockReturnValue(undefined)

    it('renders the component', () => {
      expect(() => {
        createRoot(container).render(<DocumentHead />)
      }).not.toThrow()
    })
  })
})

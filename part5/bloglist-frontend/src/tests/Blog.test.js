import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders blog component', () => {
  const blog = {
    title: 'testing blog component',
    author: 'parker siddall',
    url: 'www.google.com',
    likes: 232,
    user: '00000'
  }

  const component = render(
    <Blog blog={ blog }/>
  )

  // check for title
  expect(component.container).toHaveTextContent(
    'testing blog component'
  )

  // check for author
  expect(component.container).toHaveTextContent(
    'parker siddall'
  )

})
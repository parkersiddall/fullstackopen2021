import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

test('blog url and likes are shown when toggle is clicks', () => {
  const blog = {
    title: 'testing blog component',
    author: 'parker siddall',
    url: 'www.google.com',
    likes: 232,
    user: '00000'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={ blog } toggleVisibility={ mockHandler }/>
  )

  // check before clicking
  const togContentBefore = component.container.querySelector('.toggleContent')
  expect(togContentBefore).toHaveStyle('display: none')

  // fire button
  const button = component.getByText('view')
  fireEvent.click(button)

  // check after
  const togContentAfter = component.container.querySelector('.toggleContent')
  expect(togContentAfter).not.toHaveStyle('display: none')

  // expect(mockHandler.mock.calls).toHaveLength(1)
})
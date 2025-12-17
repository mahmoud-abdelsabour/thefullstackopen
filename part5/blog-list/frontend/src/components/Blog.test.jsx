import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'test blog',
        author: 'John Doe',
        url: 'test.com/johndoe',
        likes: 0,
        user: {
            name: 'ada loverance',
            username: 'ada',
            id: 'fds5a49615fds'
        }
    }

    render(<Blog blog={blog} />)

    //visible
    const titleElement = screen.getByText('test blog')
    const authorElement = screen.getByText('John Doe')

    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()

    //not visible
    const likesElement = screen.getByText('likes', { exact: false })
    const urlElement = screen.getByText('test.com/johndoe', { exact: false })

    expect(likesElement).not.toBeVisible()
    expect(urlElement).not.toBeVisible()

})
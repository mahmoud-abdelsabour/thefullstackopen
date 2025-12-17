import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blog = 
    {
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

test('renders content', () => {
    

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

test('checks that the blog URL and likes are shown when the button has been clicked', async () => {

    render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likesElement = screen.getByText('likes', { exact: false })
    const urlElement = screen.getByText('test.com/johndoe', { exact: false })

    expect(likesElement).toBeVisible()
    expect(urlElement).toBeVisible()

})

test('ensures that if the like button is clicked twice, the event handler is called twice.', async () => {
    const mockHandler = vi.fn()

    render(<Blog blog={blog} updateBlog={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
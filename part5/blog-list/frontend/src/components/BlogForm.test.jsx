import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
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


test.only('check that the form calls the event handler with the right details when a new blog is created.', async () => {
    const createBlog = vi.fn()

    render(<BlogForm createBlog={createBlog}/>)

    const titleField = screen.getByLabelText('Title')
    const authorField = screen.getByLabelText('Author')
    const urlField = screen.getByLabelText('URL')

    const submitButton = screen.getByText('Add')

    const user = userEvent.setup()

    await user.type(titleField, blog.title)
    await user.type(authorField, blog.author)
    await user.type(urlField, blog.url)

    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test blog')

    console.log(createBlog.mock.calls)

})

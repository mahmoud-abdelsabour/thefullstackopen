import Togglable from './Togglable'

const Blog = ({ blog, updateBlog, deleteOne, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateLikes = event => {
    event.preventDefault()

    const updatedBlogObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    }

    updateBlog(blog.id, updatedBlogObject)
  }

  const deleteBlog = event => {
    if(window.confirm(`Delete ${blog.title} by ${blog.author} ?!`))
    {
      event.preventDefault()
      deleteOne(blog.id)
    }
  }

  return(
    <div style={blogStyle}>
      <div>
        {blog.title} <strong>{blog.author}</strong>
      </div>
      <Togglable buttonLabel='view'>
        {blog.url}<br/>
        likes {blog.likes}<button onClick={updateLikes}>like</button><br/>
        {blog.user.name}<br/>
        <button style={{display: !user ? 'none' : blog.user.id === user.id ? '' : 'none'}} onClick={deleteBlog}>delete</button>
      </Togglable>
    </div>
    
  )
}

export default Blog
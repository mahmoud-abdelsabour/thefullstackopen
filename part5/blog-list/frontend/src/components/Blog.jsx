import Togglable from './Togglable'

const Blog = ({ blog, updateBlog }) => {

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

  return(
    <div style={blogStyle}>
      <div>
        {blog.title} <strong>{blog.author}</strong>
      </div>
      <Togglable buttonLabel='view'>
        <strong>URL: </strong>{blog.url}<br/>
        <strong>Likes: </strong>{blog.likes}<button onClick={updateLikes}>like</button><br/>
        <strong>Author: </strong>{blog.author}<br/>
      </Togglable>
    </div>
    
  )
}

export default Blog
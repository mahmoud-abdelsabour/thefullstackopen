import Togglable from './Togglable'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <div>
        {blog.title} <strong>{blog.author}</strong>
      </div>
      <Togglable buttonLabel='view'>
        <strong>URL: </strong>{blog.url}<br/>
        <strong>Likes: </strong>{blog.likes}<button>like</button><br/>
        <strong>Author: </strong>{blog.author}<br/>
      </Togglable>
    </div>
    
  )
}

export default Blog
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try{
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch{
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async event => {
    event.preventDefault()

    const newBlogObject = {
      title: title,
      author: author,
      url: url
    }
    try{
      const returnedBlog = await blogService.create(newBlogObject)
      setBlogs(blogs.concat(returnedBlog))

    }catch (error){
      console.log(error)
      setErrorMessage(`Error adding blog ${error}`)

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }

    setTitle('')
    setAuthor('')
    setUrl('')

  }

  if(user === null) {
    return(
      <form onSubmit={handleLogin}>
        <Notification message={errorMessage} />
        <h2>Login</h2>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />

      {user && (
        <div>
          <p> {user.name} logged in </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            Title
            <input
            type="text"
            value={title}
            onChange={({target}) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author
            <input
            type="text"
            value={author}
            onChange={({target}) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            URL
            <input
            type="text"
            value={url}
            onChange={({target}) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
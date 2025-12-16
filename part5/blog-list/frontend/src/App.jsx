import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({message: null, type: null})
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

  const handleLogin = async (username, password) => {
    console.log('logging in with', username, password)

    try{
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)

      setNotification({message: 'Login Successfully', type: 'ok'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)
    }catch{
      setNotification({message: 'wrong credentials', type: 'error'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)

    setNotification({message: 'user logged out successfully', type: 'ok'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)
  }

  const addBlog = async (newBlogObject) => {
    try{
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(newBlogObject)
      setBlogs(blogs.concat(returnedBlog))

      setNotification({message: `a new blog ${newBlogObject.title} by ${newBlogObject.author} added`, type: 'ok'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)

    }catch (error){
      console.log(error)
      setNotification({ message: `Error adding blog ${error}`, type: 'error' })

      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000);
    }
  }

  const updateBlog = async (id, updatedBlogObject) => {
    try{
      const returnedBlog = await blogService.update(id, updatedBlogObject)

      setBlogs(blogs.map(blog => blog.id === id ? returnedBlog : blog))

    }catch(error){
      console.log(error)
      setNotification({message: `error in updating blog ${error}`, type: 'error'})

      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000);
    }
  }

  const loginForm = () => (
    <LoginForm loginRequest = {handleLogin}/>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      <Notification notification={notification} />

      
      {/*Login form and Logged in user*/}
      {!user && loginForm()}
      {user && (
        <div>
          <p> {user.name} logged in </p>
          <button onClick={handleLogout}>Logout</button>
          {blogForm()}
        </div>
      )}

      

      {/*blogs saved in db*/}
      <h2>blogs</h2>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
      )}
    </div>
  )
}

export default App
import { useState, useEffect, createRef, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'
import { Link, Routes, Route, useMatch } from 'react-router-dom'
import userService from "./services/users"

const App = () => {
  const {notification, notificationDispatch} = useContext(NotificationContext)
  const {user, userDispatch} = useContext(UserContext)

  const queryClient = useQueryClient()

  const blogsData = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  const usersData = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false
  })

  const blogs = blogsData.data ?? []
  const users = usersData.data ?? []

  const match = useMatch('/users/:id')
  const matchedUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: (blog) => blogService.update(blog.id, blog),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (old = []) =>
        old.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      )
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.remove(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(['blogs'], (old = []) =>
        old.filter((b) => (b.id !== id))
      )
    },
  })
  
  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      userDispatch({type: 'set', payload: user})
    }
  }, [])

  if(blogsData.isLoading){
    return <div>loading data...</div>
  }

  const blogFormRef = createRef()

  const notify = (message, type = 'success') => {
    notificationDispatch({type: 'set', payload: {message, type}})
    setTimeout(() => {
      notificationDispatch({type: 'clear'})
    }, 5000)
  }
  
  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      userDispatch({type: 'set', payload: user})
      storage.saveUser(user)
      notify(`Welcome back, ${user.name}`)
    } catch (error) {
      notify('Wrong credentials', 'error')
    }
  }

  const handleCreate = async (blog) => {
    newBlogMutation.mutate(blog)
    notify(`Blog created: ${blog.title}, ${blog.author}`)
    blogFormRef.current.toggleVisibility()
  }


  const handleLogout = () => {
    userDispatch({type: 'clear'})
    storage.removeUser()
    notify(`Bye, ${user.name}!`)
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
      notify(`Blog ${blog.title}, by ${blog.author} removed`)
    }
  }
  

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <Login doLogin={handleLogin} />
      </div>
    )
  }



  const Home = () => (
    <div>
      
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      <Blogs blogs={blogs}/>
        
    </div>
  )


  return (
    <div>
      <Notification notification={notification} />
      //the navigation menu is already implemented
      <div>
        <Link to="/">Home - </Link>
        <Link to="/users">Users</Link>
      </div>

      <h2>blogs</h2>

      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>



      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="users" element={<Users users={users}/>}/>
        <Route path="users/:id" element={<User user={matchedUser}/>}/>
        <Route path="blogs/:id" element={<Blog blog={matchedBlog}/>}/>
      </Routes>


      
    </div>
  )
}

export default App

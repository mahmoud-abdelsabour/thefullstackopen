import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import storage from '../services/storage'
import { useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import NotificationContext from '../NotificationContext'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const {notificationDispatch} = useContext(NotificationContext)

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

  const handleVote = (blog) => {
    console.log('updating', blog)
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
    notificationDispatch({type: 'set', payload: {message: `You liked ${blog.title} by ${blog.author}`, type}})
    setTimeout(() => {
      notificationDispatch({type: 'clear'})
    }, 5000)
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
      notificationDispatch({type: 'set', payload: {message: `Blog ${blog.title}, by ${blog.author} removed`, type}})
      setTimeout(() => {
        notificationDispatch({type: 'clear'})
      }, 5000)
    }
  }

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const canRemove = blog.user ? blog.user.username === storage.me() : true

  //console.log(blog.user, storage.me(), canRemove)

  return (
    <div style={style} className="blog">
      {blog.title} by {blog.author}
      <button style={{ marginLeft: 3 }} onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            likes {blog.likes}
            <button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
              like
            </button>
          </div>
          <div>{nameOfUser}</div>
          {canRemove && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object,
  }).isRequired,
}

export default Blog

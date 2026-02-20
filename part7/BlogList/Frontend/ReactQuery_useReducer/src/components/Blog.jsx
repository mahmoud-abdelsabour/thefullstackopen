import React, { useState, useContext } from 'react'
import storage from '../services/storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import NotificationContext from '../NotificationContext'

const Blog = ({ blog }) => {
  const {notificationDispatch} = useContext(NotificationContext)
  const [comment, setComment] =useState('')
  const comments = blog?.comments ?? []
  const queryClient = useQueryClient()

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

  const commentBlogMutation = useMutation({
    mutationFn: ({id, comment}) => blogService.comment(id, comment),
    onSuccess: (commentedBlog) => {
      queryClient.setQueryData(['blogs'], (old = []) =>
      old.map((b) => (b.id === commentedBlog.id ? commentedBlog : b)))
    }
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

  const handleComment = (event) => {
    event.preventDefault()
    const cmt = comment.trim()
    if(!cmt) return
    commentBlogMutation.mutate({id: blog.id, comment: cmt})
    setComment('')
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
  if(!blog){
    return null
  }

  return (
    <div style={style} className="blog">

      <h1>{blog.title}</h1>

      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>

      <div>
        likes {blog.likes}
        <button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
          like
        </button>
      </div>
      
      <div>added by {blog.user.name}</div>

      <h3>comments</h3>

      <ul>
        {comments.map((comment, i) => (
          <li key={`${blog.id}-${i}`}>{comment}</li>
        ))}
      </ul>

      <form onSubmit={handleComment}>
        <input 
        type='text'
        value={comment} onChange={(e) => setComment(e.target.value)}/>
        <button type='submit'>send</button>
      </form>



      {canRemove && (
        <button onClick={() => handleDelete(blog)}>remove</button>
      )}



    </div>
  )
}



export default Blog

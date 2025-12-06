const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Hello world',
        author: 'Ahmed Farouk',
        url: 'blog.com/farouk/blog333',
        likes: 2000
    },

    {
        title: 'AnyThing',
        author: 'JohnDoe',
        url: 'blog.com/Doe/blog25',
        likes: 3
    }

]

const nonExistingId = async () => {
  const blog = new Blog({ 
        title: 'this will be removed soon',
        author: 'removed',
        url: 'blog.com/rmv',
        likes: 0

    })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const test_helper = { initialBlogs, nonExistingId, blogsInDb }

module.exports = test_helper

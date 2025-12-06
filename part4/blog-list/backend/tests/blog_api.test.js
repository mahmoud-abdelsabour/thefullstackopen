const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('GET Request tests', () => {

    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    
    test('all blogs are returned' , async () => {
        const response = await api.get('/api/blogs')
    
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('a specific blog can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]

        const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        assert.deepStrictEqual(resultBlog.body, blogToView)
    })
})

describe('POST Resquest tests', () => {
    test('a valid blog can be added', async () =>{
        const newBlog = 
        {
            title: 'New Blog',
            author: 'New Author',
            url: 'blog.com/New/blog808',
            likes: '7'
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(r => r.title)
        assert(titles.includes('New Blog'))
    })

    test('verifies that if the likes property is missing from the request, it will default to the value', async () => {
        const newBlog = 
        {
            title: 'missingLikesBlog',
            author: 'No Likes',
            url: 'blog.com/NoLikes/blog808',
        }

        await api.post('/api/blogs').send(newBlog)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
    })

    test.only('fails with 400 if title is missing', async () => {
        const missingTitleBlog = {
            author: 'No title',
            url: 'blog.com/Notitle/blog808',
            likes: 65
        }

        const response = await api.post('/api/blogs')
            .send(missingTitleBlog)
            .expect(400)

        assert.ok(response.body.error)
    })

    test.only('fails with 400 if url is missing', async () => {
    const missingUrlBlog = {
        title: 'no url blog',
        author: 'No Likes',
        likes: 65
    }

    const response = await api.post('/api/blogs')
        .send(missingUrlBlog)
        .expect(400)

    assert.ok(response.body.error)
    })

})

test('verifies that the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const allHaveId = response.body.every(blog => 'id' in blog)
    assert.ok(allHaveId, 'the unique identifier is not named id')
})

after(async () => {
    await mongoose.connection.close()
})
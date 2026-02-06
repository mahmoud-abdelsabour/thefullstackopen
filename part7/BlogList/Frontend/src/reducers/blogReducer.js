import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs"

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action){
            return action.payload
        },

        createBlog(state, action){
            state.push(action.payload)
        },

        updateBlog(state, action){
            return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
        },

        deleteBlog(state, action){
            return state.filter(blog => blog.id !== action.payload)
        }
    }
})

const {setBlogs, createBlog, updateBlog, deleteBlog} = blogSlice.actions

export const initBlogs = () => {
    return async (dispatch) => {
        const initialBlogs = await blogService.getAll()
        dispatch(setBlogs(initialBlogs))
    }
}

export const appendBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog)
        dispatch(createBlog(newBlog))
    }
}

export const modifyBlog = (blog) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.update(blog.id, blog)
        dispatch(updateBlog(updatedBlog))
    }
}

export const removeBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id)
        dispatch(deleteBlog(id))
    }
}

export default blogSlice.reducer
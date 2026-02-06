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
        }
    }
})

const {setBlogs, createBlog} = blogSlice.actions

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

export default blogSlice.reducer
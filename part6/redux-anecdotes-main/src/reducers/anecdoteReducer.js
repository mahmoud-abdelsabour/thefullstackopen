//already done this before
import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action){
      state.push(action.payload)
    },

    updateAnecdote(state, action){
      return state.map(anecdote => anecdote.id === action.payload.id ? action.payload : anecdote)
    },

    setAnecdotes(state, action){
      return action.payload
    }
  }
})

const { setAnecdotes, createAnecdote, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const initialAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(initialAnecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const modifyAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer

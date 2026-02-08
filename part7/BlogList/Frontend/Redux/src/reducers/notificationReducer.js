import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        modifyNotification(state, action){
            return action.payload
        },

        clearNotification(state, action){
            return null
        }
    }
})

const {modifyNotification, clearNotification} = notificationSlice.actions

export const setNotification = ({message, type}, time) => {
    return (dispatch) => {
        dispatch(modifyNotification({message, type}))

        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000);
    }
}

export default notificationSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        modifyNotification(state, action){
            return action.payload
        },

        clearNotification(state, action){
            return ''
        }
    }
})

const { modifyNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return (dispatch) => {
        dispatch(modifyNotification(message))
        
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000);
    }
}

export default notificationSlice.reducer
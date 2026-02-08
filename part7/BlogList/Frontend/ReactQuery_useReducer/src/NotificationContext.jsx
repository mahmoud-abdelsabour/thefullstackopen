import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch(action.type) {
        case 'set':
            return action.payload
        case 'clear':
            return null
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return(
        <NotificationContext.Provider value={{notification, notificationDispatch}}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext
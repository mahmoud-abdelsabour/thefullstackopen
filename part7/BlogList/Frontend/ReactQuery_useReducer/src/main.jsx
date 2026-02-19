import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationContext.jsx'
import { UserContextProvider } from './UserContext.jsx'
import {BrowserRouter as Router} from 'react-router-dom'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <Router>
    <UserContextProvider>
      <NotificationContextProvider>
        <QueryClientProvider client={queryClient}>
          <StrictMode>
            <App />
          </StrictMode>
        </QueryClientProvider>
      </NotificationContextProvider>
    </UserContextProvider>
  </Router>
)

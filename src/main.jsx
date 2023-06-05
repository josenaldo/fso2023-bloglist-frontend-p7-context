import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { NotificationContextProvider } from '@/features/notification'
import { theme } from '@/styles'
import App from '@/pages/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationContextProvider>
          <Router>
            <App />
          </Router>
        </NotificationContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

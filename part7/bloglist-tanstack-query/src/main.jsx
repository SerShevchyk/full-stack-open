import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserContextProvider } from './context/UserContext'
import { NotificationContextProvider } from './context/NotificationContext'
import { UsersContextProvider } from './context/UsersContext'
import { BlogsContextProvider } from './context/BlogsContext'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UsersContextProvider>
      <UserContextProvider>
        <BlogsContextProvider>
          <NotificationContextProvider>
            <Router>
              <App />
            </Router>
          </NotificationContextProvider>
        </BlogsContextProvider>
      </UserContextProvider>
    </UsersContextProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
import { QueryClientProvider } from 'react-query'
import { AuthContextProvider } from './hooks/useAuth'
import { PaginationContextProvider } from './hooks/usePagination'
import { Routes } from './routes'
import { queryClient } from './services/queryClient'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <PaginationContextProvider>
          <Routes />
        </PaginationContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App

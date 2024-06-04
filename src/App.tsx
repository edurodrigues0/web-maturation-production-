import { QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'

import { Routes } from './routes'
import { theme } from './styles/theme'
import { queryClient } from './services/queryClient'
import { AuthContextProvider } from './hooks/useAuth'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App

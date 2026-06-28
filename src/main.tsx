import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { UserProvider } from './context/UserContext'
import { TodosProvider } from './context/TodosContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <TodosProvider>
        <App />
      </TodosProvider>
    </UserProvider>
  </StrictMode>,
)

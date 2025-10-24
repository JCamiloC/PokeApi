import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ApolloProvider } from '@apollo/client/react'
import { apolloClient } from './lib/apolloClient'
import { Provider } from 'react-redux'
import { store } from './store'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Hook: Provider/ApolloProvider */}
    {/* Un Hook es una función especial de React que te permite "engancharte" a funcionalidades (estado, contexto, etc.) sin clases. */}
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </Provider>
  </StrictMode>,
)

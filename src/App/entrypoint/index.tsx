import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ApolloProvider} from '@apollo/client'

import App from '../ui/App'
import {client} from '../providers/ApolloClient'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
)

import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {onError} from '@apollo/client/link/error'

const httpLink = new HttpLink({
  uri: 'https://cv-project-js.inno.ws/api/graphql',
  fetchOptions: {
    mode: 'cors',
  },
})

const authLink = setContext(
  (_, {headers = {}}: {headers?: Record<string, string>}) => {
    const token = localStorage.getItem('access_token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  }
)

const errorLink = onError(({graphQLErrors, networkError, protocolErrors}) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({message}) =>
      console.error(`[GraphQL error]: Message: ${message}`)
    )

  if (protocolErrors) {
    protocolErrors.forEach(({message, extensions}) => {
      console.error(
        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(extensions)}`
      )
    })
  }

  if (networkError) console.error(`[Network error]: ${networkError}`)
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink).concat(errorLink),
  headers: {
    'Content-Type': 'application/json',
  },
  cache: new InMemoryCache(),
})

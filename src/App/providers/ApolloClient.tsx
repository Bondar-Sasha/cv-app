import {ApolloClient, InMemoryCache, HttpLink, ApolloLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {onError} from '@apollo/client/link/error'

const httpLink = new HttpLink({
  uri: 'https://cv-project-js.inno.ws/api/graphql',
  fetchOptions: {
    mode: 'cors',
  },
})

const authLink = (token?: string | null) =>
  setContext((_, {headers = {}}: {headers?: Record<string, string>}) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

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
export const preparedApolloLink = (token?: string | null) =>
  ApolloLink.from([authLink(token), errorLink, httpLink])

export const client = new ApolloClient({
  link: preparedApolloLink(localStorage.getItem('refreshToken')),
  headers: {
    'Content-Type': 'application/json',
  },
  cache: new InMemoryCache(),
})

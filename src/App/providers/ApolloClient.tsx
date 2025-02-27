import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {onError} from '@apollo/client/link/error'
import {TokenRefreshLink} from 'apollo-link-token-refresh'
import {jwtDecode} from 'jwt-decode'

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

const isTokenValidOrUndefined = async () => {
  const token = localStorage.getItem('access_token')
  if (!token) return true

  try {
    const {exp} = jwtDecode(token)
    return Date.now() < exp * 1000
  } catch (error) {
    return false
  }
}

const refreshLink = new TokenRefreshLink({
  accessTokenField: 'access_token',
  isTokenValidOrUndefined,
  fetchAccessToken: () => {
    return fetch('https://cv-project-js.inno.ws/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation updateToken {
            updateToken {
              access_token
            }
          }
        `,
      }),
    }).then((response) => response.json())
  },
  handleFetch: (accessToken) => {
    localStorage.setItem('access_token', accessToken)
  },
  handleError: (err) => {
    console.warn('Your refresh token is invalid. Try to relogin')
    console.error(err)
  },
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

export const client = new ApolloClient({
  link: authLink.concat(refreshLink).concat(httpLink).concat(errorLink),
  headers: {
    'Content-Type': 'application/json',
  },
  cache: new InMemoryCache(),
})

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { setContext } from 'apollo-link-context'
import { /*split, */ ApolloLink } from 'apollo-link'
// import { WebSocketLink } from 'apollo-link-ws'
// import { getMainDefinition } from 'apollo-utilities'
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

let apolloClient = null
let link
const httpUri = `http://${process.env.PRISMA_HOST}:${process.env.PORT}/${process.env.PRISMA_SERVICE}/${process.env.STAGE}`
if(!process.browser) {
  //ts-ignore
  global.fetch = fetch
}
const create = token => {
  const httpLink = new BatchHttpLink({
    uri: httpUri,
    credentials: 'same-origin'
  })
  link = httpLink
  const authLink = setContext((_, { headers }) => {
    const tkn = process.browser ? Cookies.get('access_token') : token
    return {
      ...headers,
      authorization: tkn ? `Bearer ${tkn}` : ''
    }
  })
  // if(process.browser) {
  //   const wsLink = new WebSocketLink({
  //     uri: httpUri,
  //     options: {
  //       reconnect: true,
  //       timeout: 60000
  //     }
  //   })

  //   link = split(({ query}) => {
  //       //ts-ignore
  //       const { kind, operation } = getMainDefinition(query)
  //       return kind === 'OperationDefinition' && operation === 'subscription'
  //     },
  //     wsLink,
  //     httpLink
  //   )
  // }
  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: !process.browser,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if(graphQLErrors) {
          graphQLErrors.map(({ message }) => {
            if(process.browser && process.env.STAGE !== 'prod') console.log(message)
            else console.log('An Unexpected Error has occured')
          })
        }
        if(networkError && process.browser) console.log('There are problems with your Internet', networkError)
      }),
      authLink.concat(link)
    ]),
    cache: new InMemoryCache({
      dataIdFromObject: o => o.id
    })
  })
}

export default token =>{
  if(!process.browser) return create(token)
  if(!apolloClient) apolloClient = create(token)
  return apolloClient
} 
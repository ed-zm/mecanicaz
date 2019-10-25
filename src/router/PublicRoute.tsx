import apollo from '../config/apollo'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

const PublicRoute = (ComposedComponent) => {
  const client = apollo('')
  const Component = props =>
      <ApolloProvider client = { client }>
        <ApolloHooksProvider client = { client }>
          <ComposedComponent { ...props } />
        </ApolloHooksProvider>
      </ApolloProvider>

  Component.getInitialProps = async ({ req }) => {
    return({ loggedIn: false })
  }
  return Component
}
  
export default PublicRoute
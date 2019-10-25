import apollo from '../config/apollo'

const PrivateRoute = (ComposedComponent) => {
    ComposedComponent.getInitialProps = async ({ req }) => {
      apollo('')
      return({ loggedIn: true })
    }
    return ComposedComponent
  }
  
export default PrivateRoute
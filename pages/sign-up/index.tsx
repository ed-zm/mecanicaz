  
import React from 'react'
import SignUp from '../../src/screens/SignUp'
import PublicRoute from '../../src/router/PublicRoute'

export default () => PublicRoute(props => <SignUp { ...props }/>)
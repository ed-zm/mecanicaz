import React from 'react'
import SignIn from '../../src/screens/SignIn'
import PublicRoute from '../../src/router/PublicRoute'

export default () => PublicRoute(props => <SignIn { ...props }/>)
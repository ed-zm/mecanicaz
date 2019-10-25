import React from 'react'
import Home from '../src/screens'
import PublicRoute from '../src/router/PublicRoute'

export default PublicRoute(props => <Home { ...props } />)
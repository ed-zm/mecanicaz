import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { USERS } from '../graphql/queries/users/users'

const Home = (props) => {
  const { data } = useQuery(USERS)
  console.log('DATA', data)
  return(
    <span> Home </span>
  )
}

export default Home
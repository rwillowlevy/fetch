import React, { useEffect } from 'react'
import { Container } from 'react-materialize'
import API from '../../utils/API'
import CheckPet from '../../components/CheckPet'
import store from '../../utils/store'
import 'materialize-css'
import './style.css'

function Home () {
  const { currentUser, Auth } = store.getState()
  console.log(currentUser)
  useEffect(() => {
    // For demonstration purposes, we mock an API call.
    let fakeAuth = 'abc'
    API.verifyToken(fakeAuth)
    .then( res => {
      console.log('user effect');
      console.log(res)
    })
  }, []);
  return (
    <Container>
      <CheckPet />
    </Container>
  )
}

export default Home

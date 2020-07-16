import React, { useEffect } from 'react'
import { Container } from 'react-materialize'
import { useHistory } from 'react-router-dom'
import API from '../../utils/API'
import CheckPet from '../../components/CheckPet'
import store from '../../utils/store'
import { addAuth } from '../../utils/actions'
import 'materialize-css'
import './style.css'
import { authenticate } from 'passport'

function Home () {
  const { checkAuth, setCheckAuth } = store.getState(false) 
  const { currentUser, Auth } = store.getState()
  let history = useHistory()
  API.verifyToken(Auth)
  .then( res => {
    console.log('user effect');
    console.log(res)
  }).catch( err => {
    console.log(err)
    store.dispatch(addAuth(undefined))
    history.push('/')
  })
  console.log(currentUser)
  return (
    <Container>
      <CheckPet />
    </Container>
  )
}

export default Home

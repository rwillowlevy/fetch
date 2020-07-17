import React, { useEffect } from 'react'
import { Container } from 'react-materialize'
import { useHistory } from 'react-router-dom'
import API from '../../utils/API'
import CheckPet from '../../components/CheckPet'
import store from '../../utils/store'
import { addAuth, addMatches } from '../../utils/actions'
import 'materialize-css'
import { authenticate } from 'passport'

function Home () {
  const { checkAuth, setCheckAuth } = store.getState(false) 
  const { currentUser, Auth, matches } = store.getState()
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
  console.log(matches)
  useEffect( () => {
    API.findMatches(currentUser._id)
    .then(res => {
      console.log('Match API:', res)
      store.dispatch(addMatches(res.data))
    })
  }, []);

  return (
    <Container>
      <CheckPet />
    </Container>
  )
}

export default Home

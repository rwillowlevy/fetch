import React, { useEffect } from 'react'
import { Container } from 'react-materialize'
import { useHistory } from 'react-router-dom'
import API from '../../utils/API'
import CheckPet from '../../components/CheckPet'
import store from '../../utils/store'
import { addAuth, addMatches } from '../../utils/actions'
import 'materialize-css'

function Home () {
  // All State Management
  const { checkAuth, setCheckAuth } = store.getState(false) 
  const { currentUser, Auth, matches } = store.getState()
  console.log(matches)
  // UseEffect hook to get matches
  useEffect( () => {
    API.getUserMatches(currentUser._id)
    .then(res => {
      console.log('Match API:', res)
      store.dispatch(addMatches(res.data))
    })
  }, []);
  let history = useHistory()
  // Check user Auth token, if its not vaild send user to home page
  API.verifyToken(Auth)
  .then( res => {
    console.log(res)
  }).catch( err => {
    console.log(err)
    store.dispatch(addAuth(undefined))
    history.push('/')
  })

  return (
    <Container>
      <CheckPet />
    </Container>
  )
}

export default Home

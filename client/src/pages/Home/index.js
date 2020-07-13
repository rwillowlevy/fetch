import React, { useState } from 'react'
import { Container } from 'react-materialize'
import API from '../../utils/API'
import CheckPet from '../../components/CheckPet'
import store from '../../utils/store'
import 'materialize-css'
import './style.css'

function Home () {
  const { currentUser } = store.getState()
  console.log(currentUser)
  return (
    <Container>
      <CheckPet />
    </Container>
  )
}

export default Home

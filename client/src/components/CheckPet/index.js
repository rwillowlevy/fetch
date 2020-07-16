import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import store from '../../utils/store'
import API from '../../utils/API'
import AllPetsCard from '../AllPetsCard'
import { addCurrentUser, addAuth } from '../../utils/actions'
import { Modal, Col, Container, Row, Button } from 'react-materialize'
import 'materialize-css'


function CheckPet () {
  const { currentUser, allPets } = store.getState()
  if (currentUser.pets.length === 0){
    return (
      <h1> You must add a pet to start matching </h1>
    )
  }
  else {
    return (
      <>
        <h1>Welcome { currentUser.username } </h1>
        <AllPetsCard/>
      </>
    )
  }
}

export default CheckPet

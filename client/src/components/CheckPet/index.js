import React, { useState } from 'react'
import store from '../../utils/store'
import AllPetsCard from '../AllPetsCard'
import 'materialize-css'


function CheckPet () {
  const { currentUser } = store.getState()
  if (currentUser.pets.length === 0){
    return (
      <h1> You must add a pet to start matching </h1>
    )
  }
  else {
    return (
      <>
        <h4>Welcome { currentUser.username }! Start Matching! </h4>
        <AllPetsCard/>
      </>
    )
  }
}

export default CheckPet

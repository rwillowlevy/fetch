import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import API from '../../utils/API'
import store from '../../utils/store'
import PetCard from '../../components/PetCard/index'
import AddPetModal from '../../components/AddPetModal'
import { Textarea, Select, TextInput, Checkbox } from 'react-materialize'
import 'materialize-css'

function Profile () {
  const [pet, setPet] = useState({
    name: '',
    age: '',
    size: '',
    bio: '',
		gender: '',
		isVaccinated: false
  })
  const { currentUser } = store.getState()
  console.log( currentUser )
  const pageLoad = () => {
    if ( currentUser.pets.length === 0 ){
      return (
        <>
          <h1> You Have No Pets </h1>
          <AddPetModal />
        </>
      )
    } else {
      return <PetCard pets= { currentUser.pets } />

    }
  }
  return (
    <div className='container'>
      { pageLoad() }
    </div>
  )
}

export default Profile

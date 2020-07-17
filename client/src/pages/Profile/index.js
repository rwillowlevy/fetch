import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import API from '../../utils/API'
import store from '../../utils/store'
import PetCard from '../../components/PetCard/index'
import AddPetModal from '../../components/AddPetModal'
import { addAuth, addMatches } from '../../utils/actions'
import { Textarea, Select, TextInput, Checkbox } from 'react-materialize'
import 'materialize-css'

function Profile () {
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
  useEffect( () => {
    API.findMatches(currentUser._id)
    .then(res => {
      console.log('Match API:', res)
      store.dispatch(addMatches(res.data))
    })
  }, []);

  const [pet, setPet] = useState({
    name: '',
    age: '',
    size: '',
    bio: '',
		gender: '',
		isVaccinated: false
  })
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

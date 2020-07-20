import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import API from '../../utils/API'
import store from '../../utils/store'
import PetCard from '../../components/PetCard'
import UserInfoForm from '../../components/UserInfoForm'
import AddPetModal from '../../components/AddPetModal'
import { addAuth, addMatches } from '../../utils/actions'
import { Container } from 'react-materialize'
import 'materialize-css'
import './styles.css'
// import DogGif from '../../components/Dog-gif/dog-up-gif.gif'

function Profile () {
  // State from store
  const { currentUser, Auth } = store.getState()

  // UseEffect hook to get matches
  useEffect(() => {
    API.getUserMatches(currentUser._id).then(res => {
      store.dispatch(addMatches(res.data))
    })
  }, [])
  let history = useHistory()
  // Check user Auth token, if its not vaild send user to home page
  API.verifyToken(Auth)
    .then(res => {
    })
    .catch(err => {
      store.dispatch(addAuth(undefined))
      history.push('/')
    })
  // Function to check if current user has pets
  const formLoad = () => {
    if (currentUser.pets.length > 0) {
      return (
        <>
          <h1>My Pets</h1>
          <PetCard />
          <h1>My User Info</h1>
          <UserInfoForm />
        </>
      )
    } else {
      return (
        <Container className='noPetContainer'>
          <h1> You Have No Pets </h1>
          <AddPetModal />
          <img className='dog-gif' src='/images/dog-up-gif.gif' alt='Dog gif' />
        </Container>
      )
    }
  }
  return <div className='container'>{formLoad()}</div>
}

export default Profile

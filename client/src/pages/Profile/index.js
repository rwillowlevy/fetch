import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import API from '../../utils/API'
import store from '../../utils/store'
import PetCard from '../../components/PetCard/index'
import AddPetModal from '../../components/AddPetModal'
import { addAuth, addMatches } from '../../utils/actions'
import { Container, Row, Col } from 'react-materialize'
import 'materialize-css'
import './styles.css'
// import DogGif from '../../components/Dog-gif/dog-up-gif.gif'

function Profile () {
  // State from store
  const { currentUser, Auth } = store.getState()
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
    console.log('user effect');
    console.log(res)
  }).catch( err => {
    console.log(err)
    store.dispatch(addAuth(undefined))
    history.push('/')
  })
  console.log( currentUser )
  // Function to check if current user has pets
  const pageLoad = () => {
    if ( currentUser.pets.length === 0 ){
      return (
        <Container className="noPetContainer">
          <h1> You Have No Pets </h1>
          <AddPetModal />
          <img className="dog-gif" src="/images/dog-up-gif.gif" alt="Dog gif"/>
        </Container>
      )
    } else {
      return (
        <Container className="mypet-container">
          <h1>My Pets</h1>
          <div className="mypet-card">
          <PetCard pets= { currentUser.pets } />
          </div>
        </Container>
      )
    }
  }
  return (
    <div className='container'>
      { pageLoad() }
    </div>
  )
}

export default Profile

import React, { useState } from 'react'
import store from '../../utils/store'
import { addPets, addRandomNum } from '../../utils/actions'
import API from '../../utils/API'
import { Card, CardTitle, Icon, Col, Row, Button } from 'react-materialize'
import 'materialize-css'
import './style.css'

function AllPetCard () {
  // State Management
  const { currentUser, allPets, randomNumber } = store.getState()
  const [ cardAn, setCardAn ] = useState('animate__animated animate__fadeIn')
  const [ match, setMatch ] = useState('hideMatch')
  const [ btns, setBtns ] = useState('')
  // Remove current users pet from all pets 
  const possiblePets = allPets.filter(
    pet => pet._id !== currentUser.pets[0]._id
  )
  // Generate random number for select random pet
  let randomNum = Math.floor(Math.random() * possiblePets.length)
  if ( randomNumber === undefined ){
    store.dispatch(addRandomNum(randomNum))
  }
  else {
    randomNum = randomNumber
  }
  const currentPet = possiblePets[randomNum]
  // Filter pets for new state without the current pet
  const newPetState = possiblePets.filter(pet => pet._id !== currentPet._id)
  // current user pet id
  const currentUserPetID = currentUser.pets[0]._id
  console.log(possiblePets)
  // Function for when user swipes right
  const likedSwipe = async (e) => {
    e.preventDefault()
    const data = {
      userId: currentUser.pets[0].userId,
      petId: currentUserPetID,
      targetUserId: currentPet.userId,
      targetPetId: currentPet._id,
      liked: true
    }
    const res = await API.createSwipe(data)
    console.log(res)
    if (res.data.msg === "It's a match!"){
      setMatch('showMatch')
      setBtns('disabled')
      setTimeout( ()=> {
        setCardAn('animate__animated animate__fadeOutRight')
        setMatch('hideMatch')
        store.dispatch(addPets(newPetState))
        store.dispatch(addRandomNum(undefined))
      }, 2000)
      setTimeout(()=> {
        setBtns('')
        setCardAn('animate__animated animate__fadeInLeft')
      }, 2300)
    }
    else {
      setCardAn('animate__animated animate__fadeOutRight')
      setTimeout(()=>{
        store.dispatch(addPets(newPetState))
        store.dispatch(addRandomNum(undefined))
        setCardAn('animate__animated animate__fadeInLeft')
      }, 300)
    }
  }
  // Function for when user swipes left
  const dislikedSwipe = async (e) => {
    e.preventDefault()
    const data = {
      userId: currentUser.pets[0].userId,
      petId: currentUserPetID,
      targetUserId: currentPet.userId,
      targetPetId: currentPet._id,
      liked: false
    }
    const res = await API.createSwipe(data)
    console.log(res)
    setCardAn('animate__animated animate__fadeOutLeft')
    setTimeout(()=>{
      store.dispatch(addPets(newPetState))
      store.dispatch(addRandomNum(undefined))
      setCardAn('animate__animated animate__fadeInRight')
    }, 300)
  }
  // Function to render pet cards if there are possible pets in array
  const renderCard = () => {
    if (possiblePets.length > 0) {
      return (
        <div>
          <Row className='center' >
            <Col className='center' s={12}>
              <Card
                className= {cardAn}
                closeIcon={<Icon>close</Icon>}
                header={
                  <CardTitle image={currentPet.image} reveal waves='light' />
                }
                reveal={<p> {currentPet.bio} </p>}
                revealIcon={<Icon>more_vert</Icon>}
                title={currentPet.name}
              >
                <p>
                  {currentPet.age} {currentPet.gender} {currentPet.size}{' '}
                  {currentPet.breed}
                </p>
              </Card>
            </Col>
          </Row>
          <Row className='center'>
            <Col className='center' s={6}>
              <Button
                className = { btns }
                node='button'
                style={{
                  marginRight: '5px'
                }}
                waves='light'
                onClick = { dislikedSwipe }
              >
                DisLike
              </Button>
            </Col>
            <Col className='center' s={6}>
              <Button
                className = { btns }
                node='button'
                style={{
                  marginRight: '5px'
                }}
                waves='light'
                onClick= { likedSwipe }
              >
                Like
              </Button>
            </Col>
          </Row>
        </div>
      )
    } else {
      return <h1> All out of pets! </h1>
    }
  }
  return (
    <div>
      <div className={`animate__animated animate__heartBeat ${match}`}> 
        <h1> Its a match! </h1>
      </div>
      {renderCard()}
    </div>
    )
}

export default AllPetCard

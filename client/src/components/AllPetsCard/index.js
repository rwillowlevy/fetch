import React, { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import store from '../../utils/store'
import { addPets } from '../../utils/actions'
import API from '../../utils/API'
import { Card, CardTitle, Icon, Col, Row, Button } from 'react-materialize'
import 'materialize-css'
import './style.css'

function AllPetCard () {
  const [ swiped, setSwiped ] = useState()
  const { currentUser, allPets } = store.getState()
  const [ cardAn, setCardAn ] = useState('animate__animated animate__fadeIn')
  const [ match, setMatch ] = useState('hideMatch')
  const possiblePets = allPets.filter(
    pet => pet._id !== currentUser.pets[0]._id
  )
  const currentPet =
    possiblePets[Math.floor(Math.random() * possiblePets.length)]
  const newPetState = possiblePets.filter(pet => pet._id !== currentPet._id)
  const currentUserPetID = currentUser.pets[0]._id
  console.log(possiblePets)
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
      setTimeout( ()=> {
        setCardAn('animate__animated animate__fadeOutTopRight')
        setMatch('hideMatch')
        store.dispatch(addPets(newPetState))
      }, 2000)
      setTimeout(()=> {
        setCardAn('animate__animated animate__fadeInTopLeft')
      }, 2300)
    }
    else {
      setCardAn('animate__animated animate__fadeOutTopRight')
      setTimeout(()=>{
        store.dispatch(addPets(newPetState))
        setCardAn('animate__animated animate__fadeInTopLeft')
      }, 300)
    }
  }

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
    setCardAn('animate__animated animate__fadeOutTopLeft')
    setTimeout(()=>{
      store.dispatch(addPets(newPetState))
      setCardAn('animate__animated animate__fadeInTopRight')
    }, 300)
  }
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

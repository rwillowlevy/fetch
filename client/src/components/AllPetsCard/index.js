import React, { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import store from '../../utils/store'
import { addPets } from '../../utils/actions'
import API from '../../utils/API'
import { Card, CardTitle, Icon, Col, Row, Button } from 'react-materialize'
import 'materialize-css'

function AllPetCard () {
  const [ swiped, setSwiped ] = useState()
  const { currentUser, allPets } = store.getState()

  const possiblePets = allPets.filter(
    pet => pet._id !== currentUser.pets[0]._id
  )
  const currentPet =
    possiblePets[Math.floor(Math.random() * possiblePets.length)]
  console.log(currentPet)
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
    store.dispatch(addPets(newPetState))
    setSwiped(Date.now)
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
    store.dispatch(addPets(newPetState))
    setSwiped(Date.now)
  }
  const renderCard = () => {
    if (possiblePets.length > 0) {
      return (
        <>
          <Row>
            <Col m={6} s={12}>
              <Card
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
          <Row>
            <Col m={3} s={6}>
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
            <Col>
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
        </>
      )
    } else {
      return <h1> All out of pets! </h1>
    }
  }
  return renderCard()
}

export default AllPetCard

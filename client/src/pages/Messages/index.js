import React, { useState, useEffect } from 'react'
import API from '../../utils/API'
import store from '../../utils/store'
import { addMatches } from '../../utils/actions'
import { Row, Col, Card, Icon, CardTitle, Container } from 'react-materialize'
import Modals from '../../components/Modal/index'
import 'materialize-css'

function Messages () {
  const { currentUser, matches } = store.getState()
  const renderMatches = () =>{
    if ( matches.length > 0 ){
      return (
        <Container>
          <Row>
            <Col s={12}>
              <h4>Messages is currently under development 🚧</h4>
              <h4>Feel free to email your matches!</h4>
            </Col>
          </Row>
          <Row>
            { matches.map(match => (
          <Col m={4} s={12}>
            <Card
              closeIcon={<Icon>close</Icon>}
              header={
                <CardTitle image={match.image} reveal waves='light' />
              }
              reveal={<><p> {match.bio} </p> <br /> <a href={`mailto:${match.userId.email}`}> email User</a></>}
              revealIcon={<Icon>more_vert</Icon>}
              title={match.name}
            >
              <p>
                {match.age} {match.gender} {match.size}{' '}
                {match.breed}
              </p>
            </Card>
          </Col>
            )) }
        </Row>
        </Container>
      )
    }
    else {
      return <h1> No matches </h1>
    }
  }
  useEffect( () => {
    API.findMatches(currentUser._id)
    .then(matches => {
      console.log('Match API:', matches)
      store.dispatch(addMatches(matches.data))
    })
  }, []);
  return (
    <>
      {renderMatches()}
    </>
  )
}

export default Messages

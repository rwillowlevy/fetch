import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import API from '../../utils/API'
import store from '../../utils/store'
import { addMatches, addAuth } from '../../utils/actions'
import { Row, Col, Card, Icon, CardTitle, Container } from 'react-materialize'
import 'materialize-css'

function Messages () {
  // State from store 
  const { currentUser, matches, Auth } = store.getState()
  // UseEffect hook to get matches
  useEffect( () => {
    API.getUserMatches(currentUser._id)
    .then(matches => {
      console.log('Match API:', matches)
      store.dispatch(addMatches(matches.data))
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
  // Function to render matches if there are matches else let user know 'No Matches'
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
              reveal={<><p> {match.bio} </p> <br /> <a href={`mailto:${match.userId.email}`}> email { match.userId.username }</a></>}
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
  return (
    <>
      {renderMatches()}
    </>
  )
}

export default Messages

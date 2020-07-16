import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import store from '../../utils/store'
import API from '../../utils/API'
import { addCurrentUser, addAuth, addPets } from '../../utils/actions'
import { Modal, Col, Container, Row, Button } from 'react-materialize'
import 'materialize-css'
import './style.css'


function Modals () {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  let history = useHistory()
  const matchPassword = () =>{
    if ( password != confirmPassword ){
      return <p> password do not match </p>
    }
  }
  const login = (e) => {
    e.preventDefault()
    const user = {
      email,
      password
    }
    API.loginUser(user)
    .then(res => {
      console.log(res)
      store.dispatch(addCurrentUser(res.data.user))
      store.dispatch(addAuth(res.data.token))
      API.getAllPets()
      .then( res => {
        store.dispatch(addPets(res.data))
        console.log(store.getState())
      return history.push('/match')
      })
    })
  }
  const createUser = (e) => {
    e.preventDefault()
    const user = {
      username,
      email,
      password
    }
    console.log(user)
    API.createUser(user)
    .then(res => {
      console.log('done')
      console.log(res)
      if ( res.status === 200 ){
        console.log(res.data)
        console.log(store.getState())
        store.dispatch(addCurrentUser(res.data))
        API.loginUser({ email : user.email, password: user.password })
        .then( res => {
          store.dispatch(addAuth(res.data.token))
          API.getAllPets()
          .then( res => {
            store.dispatch(addPets(res.data))
            console.log(store.getState())
            return history.push('/profile')
          })
        })
      }
    })
  }
  return (
    <>
      <Container>
        <Row className='modalBtns'>
          <Col s={12}>
            <a
              className='waves-effect waves-light btn modal-trigger pink darken-2 z-depth-5 signupBtn'
              href='#modal2'
            >
              Signup
            </a>
          </Col>
        </Row>
      </Container>

      <Modal id='modal1' className='modal'>
        <div className='row'>
          <form className='col s12'>
            <div className='row'>
              <div className='input-field col s12'>
                <input id='email' type='email' className='validate' onChange={ e => setEmail(e.target.value) } />
                <label for='email'>Email</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input id='password' type='password' className='validate' onChange={ e => setPassword(e.target.value) } />
                <label for='password'>Password</label>
              </div>
              <button
                className='btn waves-effect waves-light pink darken-2'
                onClick={login}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal id='modal2' className='modal'
        actions={[
          <Button flat modal='close' node='butoon' waves='green'>
            Close
          </Button>,
          <Button modal='close' node='button' waves='green' onClick= { createUser } >
           Next
          </Button>
        ]}
        >
        <div className='row'>
          <form className='col s12'>
            <div className='row'>
              <div className='input-field col s12'>
                <input id='username' type='text' className='validate' onChange={ e => setUsername(e.target.value) }/>
                <label for='username'>Username</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input id='email' type='email' className='validate' onChange={ e => setEmail(e.target.value) }/>
                <label for='email'>Email</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input id='password' type='password' className='validate' onChange={ e => setPassword(e.target.value) } />
                <label for='password'>Password</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input id='confirmPassword' type='password' className='validate' onChange={ e=> setConfirmPassword(e.target.value )} />
                <label for='confirmPassword'>Confirm Password</label>
                { matchPassword() }
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default Modals

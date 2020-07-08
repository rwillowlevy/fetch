import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import store from '../../utils/store'
import axios from 'axios'
import { Modal, Col, Container, Row } from 'react-materialize'
import 'materialize-css'


function Modals () {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const matchPassword = () =>{
    if ( password != confirmPassword ){
      return <p> password do not match </p>
    }
  }
  let history = useHistory()
  const createUser = (e) => {
    e.preventDefault()
    const user = {
      username,
      email,
      password
    }
    console.log(user)
    axios.post('/api/users/create', user)
    .then(res => {
      console.log('done')
      console.log(res)
      if ( res.status === 200 ){
        console.log(res.data)
        console.log(store.getState())
        store.dispatch({
          type: 'ADD_CURRENT_USER',
          payload: res.data
        })
        console.log(store.getState())
        return history.push('/profile')
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
                <input id='email' type='email' className='validate' />
                <label for='email'>Email</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input id='password' type='password' className='validate' />
                <label for='password'>Password</label>
              </div>
              <button
                className='btn waves-effect waves-light pink darken-2'
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal id='modal2' className='modal'>
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
            <button
              className='btn waves-effect waves-light pink darken-2'
              onClick= { createUser }
            >
              Signup
            </button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default Modals

import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import store from '../../utils/store'
import API from '../../utils/API'
import Alerts from '../Alerts'
import { addCurrentUser, addAuth, addPets } from '../../utils/actions'
import { Modal, Col, Container, Row, Button } from 'react-materialize'
import 'materialize-css'
import './style.css'

function Modals () {
  // State Management
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [type, setType] = useState('none')

  let history = useHistory()
  const matchPassword = () => {
    if (password != confirmPassword) {
      return <p> password do not match </p>
    }
  }
  // Function for user login
  const login = async e => {
    try {
      e.preventDefault()
      const user = {
        email,
        password
      }
      const res = await API.loginUser(user)
      store.dispatch(addCurrentUser(res.data.user))
      store.dispatch(addAuth(res.data.token))
      const petsRes = await API.getAllPets()
      store.dispatch(addPets(petsRes.data))
      return history.push('/match')
    } catch (err) {
      setType('danger')
      setTimeout(() => {
        setType('none')
      }, 2000)
    }
  }
  // Function to create new user
  const createUser = async e => {
    try {
      e.preventDefault()
      const user = {
        username,
        email,
        password
      }
      const userRes = await API.createUser(user)
      if (userRes.status === 200) {
        store.dispatch(addCurrentUser(userRes.data))
        const authRes = await API.loginUser({
          email: user.email,
          password: user.password
        })
        store.dispatch(addAuth(authRes.data.token))
        const petsRes = await API.getAllPets()
        store.dispatch(addPets(petsRes.data))
        return history.push('/profile')
      }
    } catch (err) {
      setType('danger')
      setTimeout(() => {
        setType('none')
      }, 2000);
    }
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

      <Modal
        id='modal1'
        className='modal'
        actions={[
          <Button className='modal-close-btn' flat modal='close' node='butoon'>
            Close
          </Button>
        ]}
        options={{
          preventScrolling: false,
        }}

      >
        <div className='row'>
          <form className='col s12'>
            <Alerts type={type} />
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  id='email'
                  type='email'
                  className='validate'
                  onChange={e => setEmail(e.target.value)}
                />
                <label for='email'>Email</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  id='password'
                  type='password'
                  className='validate'
                  onChange={e => setPassword(e.target.value)}
                />
                <label for='password'>Password</label>
              </div>
              <button className='login-btn-modal btn' onClick={login}>
                Login
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        className='signup-modal-btns'
        id='modal2'
        className='modal'
        actions={[
          <Button className='modal-close-btn' flat modal='close' node='butoon'>
            Close
          </Button>,
          <Button
            className='modal-signup-btn'
            node='button'
            onClick={createUser}
          >
            Signup
          </Button>
        ]}
        options={{
          preventScrolling: false,
        }}
      >
        <div className='row'>
          <form className='col s12'>
            <Alerts type={type} />

            <div className='row'>
              <div className='input-field col s12'>
                <input
                  id='username'
                  type='text'
                  className='validate'
                  onChange={e => setUsername(e.target.value)}
                />
                <label for='username'>Username</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  id='email'
                  type='email'
                  className='validate'
                  onChange={e => setEmail(e.target.value)}
                />
                <label for='email'>Email</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  id='password'
                  type='password'
                  className='validate'
                  onChange={e => setPassword(e.target.value)}
                />
                <label for='password'>Password</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  id='confirmPassword'
                  type='password'
                  className='validate'
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <label for='confirmPassword'>Confirm Password</label>
                {matchPassword()}
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default Modals

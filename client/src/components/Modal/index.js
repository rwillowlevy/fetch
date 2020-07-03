import React  from 'react'
import { Modal, Col, Container, Row } from 'react-materialize'
import 'materialize-css'


function Modals () {
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
                type='submit'
                name='action'
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
                <input id='username' type='text' className='validate' />
                <label for='username'>Username</label>
              </div>
            </div>
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
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input id='confirmPassword' type='password' className='validate' />
                <label for='confirmPassword'>Confirm Password</label>
              </div>
            </div>
            <button
              className='btn waves-effect waves-light pink darken-2'
              type='submit'
              name='action'
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

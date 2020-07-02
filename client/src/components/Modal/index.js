import React  from 'react'
import { Modal, Col, Container, Row } from 'react-materialize'
import 'materialize-css'


function Modals () {
  return (
    <>
      <Container>
        <Row className='modalBtns'>
          <Col s={12} m={6}>
            <a
              className='waves-effect waves-light btn modal-trigger red darken-4 z-depth-5'
              href='#modal1'
            >
              Login
            </a>
          </Col>
          <Col className='modalBtns' s={12} m={6}>
            <a
              className='waves-effect waves-light btn modal-trigger red darken-4 z-depth-5'
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
                className='btn waves-effect waves-light'
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
                className='btn waves-effect waves-light'
                type='submit'
                name='action'
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default Modals

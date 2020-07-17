import React, { useState, useEffect } from 'react'
import API from '../../utils/API'
import store from '../../utils/store'
import { Modal, Col, Container, Row } from 'react-materialize'
import Modals from '../../components/Modal/index'
import 'materialize-css'

function Messages () {
  const { currentUser } = store.getState()
  useEffect( () => {
    API.findMatches(currentUser._id)
      .then(matches => {
        console.log('Match API:', matches)
      })
  }, []);
  return (
    <div>

    </div>
  )
}

export default Messages

import React, { useState, useEffect } from 'react'
import API from '../../utils/API'
import store from '../../utils/store'
import { Modal, Col, Container, Row } from 'react-materialize'
import Modals from '../../components/Modal/index'
import 'materialize-css'

function Messages () {
  const { currentUser } = store.getState()
  useEffect( async() => {
    const matches = await API.findMatches(currentUser._id)
    console.log('Match API:', matches)
  }, []);
  return (
    <div>

    </div>
  )
}

export default Messages

import React, { useState } from 'react'
import { Modal, Button, TextInput, Select, Textarea, Checkbox } from 'react-materialize'
import API from '../../utils/API'
import AddPetModal from '../../components/AddPetModal'
import store from '../../utils/store'
import 'materialize-css'
import './style.css'

function Home () {
  const { currentUser } = store.getState()
  console.log(currentUser)
  return (
    <>
    </>
  )
}

export default Home

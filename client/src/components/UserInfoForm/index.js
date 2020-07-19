import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import store from '../../utils/store'
import API from '../../utils/API'
import Alerts from '../Alerts/index'
import { addCurrentUser, addAuth, addPets } from '../../utils/actions'
import { TextInput, Button } from 'react-materialize'
import 'materialize-css'

function UserInfoForm () {
  // State Management
  const { currentUser } = store.getState()
  const [username, setUsername] = useState(currentUser.username)
  const [email, setEmail] = useState(currentUser.email)
  const [ type, setType ] = useState('none')
  let history = useHistory()
  const updateUser = async (e) => {
    const user = {
        username,
        email,
    }
    e.preventDefault()
    try{
        const updateUserRes = await API.updateUser(currentUser._id, user)
        store.dispatch(addCurrentUser(updateUserRes.data))
        console.log(updateUserRes)
        setType('success')
        console.log(type)
    }
    catch (err) {
        console.log(err)
    }
  }
  const deleteUser = async (e) => {
    e.preventDefault()
    try {
        const removeUserRes = await API.removeUser(currentUser._id)
        console.log(removeUserRes)
        history.push('/')
    }
    catch (err) {
        console.log(err)
    }
  }

  return (
    <>
      <Alerts type = { type }/>
      <TextInput id='TextInput-4' label='UserName' onChange={ e => setUsername(e.target.value) } value={username} />
      <TextInput email id='TextInput-4' label='Email' value={email} onChange={ e => setEmail(e.target.value) } validate />
      <Button
        node='button'
        style={{
          marginRight: '5px'
        }}
        waves='light'
        onClick = { updateUser }
      >
        Update User
      </Button>
      <Button
        node='button'
        style={{
          marginRight: '5px'
        }}
        waves='light'
        onClick = { deleteUser }
      >
        Delete Account
      </Button>
    </>
  )
}

export default UserInfoForm

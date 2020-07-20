import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import store from '../../utils/store'
import API from '../../utils/API'
import Alerts from '../Alerts/index'
import { addCurrentUser, addAuth, addPets } from '../../utils/actions'
import { TextInput, Button, Modal } from 'react-materialize'
import 'materialize-css'

function UserInfoForm () {
  // State Management
  const { currentUser } = store.getState()
  const [type, setType] = useState('none')
  const [username, setUsername] = useState(currentUser.username)
  const [email, setEmail] = useState(currentUser.email)
  const history = useHistory()
  const updateUser = async e => {
    const user = {
      username,
      email
    }
    e.preventDefault()
    try {
      const updateUserRes = await API.updateUser(currentUser._id, user)
      store.dispatch(addCurrentUser(updateUserRes.data))
      setType('success')
      setTimeout(() => {
        setType('none')
      }, 2000)
    } catch (err) {
      setType('danger')
      setTimeout(() => {
        setType('none')
      }, 2000)
    }
  }
  const deleteUser = async e => {
    e.preventDefault()
    try {
      const removeUserRes = await API.removeUser(currentUser._id)
      history.push('/')
    } catch (err) {
    }
  }

  return (
    <>
      <Alerts type={type} />
      <TextInput
        id='TextInput-4'
        label='UserName'
        onChange={e => setUsername(e.target.value)}
        value={username}
      />
      <TextInput
        email
        id='TextInput-4'
        label='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        validate
      />
      <Button
        node='button'
        style={{
          marginRight: '5px'
        }}
        waves='light'
        onClick={updateUser}
      >
        Update User
      </Button>
      <Modal
        actions={[
          <Button flat modal='close' node='button'>
            Cancel
          </Button>,
          <Button node='button' waves='light' onClick={ deleteUser }>
            Delete Account
          </Button>,
        ]}
        bottomSheet={false}
        fixedFooter={false}
        header='Delete Account'
        id='Modal-0'
        open={false}
        options={{
          dismissible: true,
          endingTop: '10%',
          inDuration: 250,
          opacity: 0.5,
          outDuration: 250,
          preventScrolling: false,
          startingTop: '4%'
        }}
        trigger={<Button node='button' style={{ marginRight: '5px'}} >Delete Account</Button>}
      >
        <p>
          WARNING, by clicking "Delete Account" you will lose all your information and no longer have access to your account.
        </p>
      </Modal>
    </>
  )
}

export default UserInfoForm

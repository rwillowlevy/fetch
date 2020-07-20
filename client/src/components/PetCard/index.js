import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { TextInput, Select, Checkbox, Textarea, Button, Modal } from 'react-materialize'
import API from '../../utils/API'
import store from '../../utils/store'
import Alerts from '../Alerts'
import { updateCurrentUserPet, deleteCurrentUserPet } from '../../utils/actions'
import 'materialize-css'

function PetCard () {
  const { currentUser, Auth } = store.getState()
  const [pet, setPet] = useState({
    name: currentUser.pets[0].name,
    image: currentUser.pets[0].image,
    age: currentUser.pets[0].age,
    size: currentUser.pets[0].size,
    gender: currentUser.pets[0].gender,
    bio: currentUser.pets[0].bio,
    breed: currentUser.pets[0].breed,
    isVaccinated: currentUser.pets[0].isVaccinated,
    userId: currentUser._id
  })
  const [type, setType] = useState('none')
  const history = useHistory()
  const updatePet = async e => {
    e.preventDefault()
    try {
      const updatePetRes = await API.updatePet(currentUser.pets[0]._id, pet)
      store.dispatch(updateCurrentUserPet(updatePetRes.data))
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
  const deletePet = async e => {
    e.preventDefault()
    try {
      const removePetRes = await API.removePet(currentUser.pets[0]._id)
      store.dispatch(deleteCurrentUserPet())
      history.push('/profile')
    } catch (err) {
      setType('danger')
      setTimeout(() => {
        setType('none')
      }, 2000)
    }
  }
  const renderCard = () => {
    if (currentUser.pets.length > 0) {
      return (
        <>
          <img src={pet.image} />
          <Alerts type={type} />
          <TextInput
            className='upload-btn'
            id='TextInput-4'
            label='Pet Name'
            value={pet.name}
            onChange={e => setPet({ ...pet, name: e.target.value })}
          />
          <TextInput
            id='TextInput-4'
            label='Breed'
            onChange={e => setPet({ ...pet, breed: e.target.value })}
            value={pet.breed}
          />
          <Select
            id='Select-9'
            multiple={false}
            onChange={e => setPet({ ...pet, age: e.target.value })}
            options={{
              classes: '',
              dropdownOptions: {
                alignment: 'left',
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                outDuration: 250
              }
            }}
            value={pet.age}
          >
            <option disabled value=''>
              Age
            </option>
            <option value='Puppy'>Puppy</option>
            <option value='Junior'>Junior</option>
            <option value='Adult'>Adult</option>
            <option value='Mature'>Mature</option>
            <option value='Senior'>Senior</option>
          </Select>
          <Select
            id='Select-9'
            multiple={false}
            onChange={e => setPet({ ...pet, size: e.target.value })}
            options={{
              classes: '',
              dropdownOptions: {
                alignment: 'left',
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                outDuration: 250
              }
            }}
            value={pet.size}
          >
            <option disabled value=''>
              Pet Size Choose your option
            </option>
            <option value='Toy'>Toy (under 12 lbs)</option>
            <option value='Small'>Small (12-25 lbs)</option>
            <option value='Medium'>Medium (25-50 lbs)</option>
            <option value='Large'>Large (50-100 lbs)</option>
            <option value='Extra Large'>Extra Large(100+ lbs)</option>
          </Select>
          <Select
            id='Select-9'
            multiple={false}
            onChange={e => setPet({ ...pet, gender: e.target.value })}
            options={{
              classes: '',
              dropdownOptions: {
                alignment: 'left',
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                outDuration: 250
              }
            }}
            value={pet.gender}
          >
            <option disabled value=''>
              Gender
            </option>
            <option value='Female'>Female</option>
            <option value='Male'>Male</option>
          </Select>
          <Checkbox
            id='Checkbox_3'
            label='Check if your pet is Vaccinated'
            value='yes'
            indeterminate
            onChange={e => setPet({ ...pet, isVaccinated: e.target.checked })}
          />
          <Textarea
            data-length={500}
            id='Textarea-12'
            label='Bio'
            onChange={e => setPet({ ...pet, bio: e.target.value })}
            value={pet.bio}
          />
          <Button
            node='button'
            style={{
              marginRight: '5px'
            }}
            waves='light'
            onClick={updatePet}
          >
            Update Pet
          </Button>
          <Modal
            actions={[
              <Button flat modal='close' node='button'>
                Cancel
              </Button>,
              <Button node='button' waves='light' onClick={ deletePet }>
                Delete Pet
              </Button>
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header='Delete Pet'
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
            trigger={
              <Button node='button' style={{ marginRight: '5px' }}>
                Delete Pet
              </Button>
            }
          >
            <p>
              WARNING, by clicking "Delete Pet" you will lose all your
              information and no longer have access to your pet and this pets matches.
            </p>
          </Modal>
        </>
      )
    } else {
      return <></>
    }
  }
  return renderCard()
}

export default PetCard

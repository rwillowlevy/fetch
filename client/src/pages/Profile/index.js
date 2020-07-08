import React, { useState, useEffect } from 'react'
import API from '../../utils/API'
import store from '../../utils/store'
import { Textarea, Select, TextInput, Checkbox } from 'react-materialize'
import 'materialize-css'

function Profile () {
  const [pet, setPet] = useState({
    name: '',
    age: '',
    size: '',
    bio: '',
		temperament: '',
		isVaccinated: false
  })
  const addPet = e => {
    e.preventDefault()
    const { currentUser } = store.getState()
    console.log(currentUser._id)
    console.log(pet)
    API.createPet(pet)
    	.then ((res) => {
    		console.log ('pet added')
    		API.updateUser( currentUser._id, { pets: res.data._id } )
    	}).then (res => console.log(res))
  }
  return (
    <div className='container'>
			<TextInput
				id="TextInput-4"
				label="Pet Name"
				onChange={e => setPet({ ...pet, name: e.target.value })}
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
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250
          }
        }}
        value=''
      >
        <option disabled value=''>
          Age in Dog Years
        </option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
				<option value='4'>4</option>
				<option value='5'>5</option>
				<option value='6'>6</option>
				<option value='7'>7</option>
				<option value='8'>8</option>
				<option value='9'>9</option>
				<option value='10'>10</option>
				<option value='11'>11</option>
				<option value='12'>12</option>
				<option value='13'>13</option>
				<option value='14'>14</option>
				<option value='15'>15</option>

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
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250
          }
        }}
        value=''
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
      <Textarea
        data-length={240}
        id='Textarea-12'
        label='Bio'
        onChange={e => setPet({ ...pet, bio: e.target.value })}
      />
			<TextInput
				id="TextInput-4"
				label="temperament"
				onChange={e => setPet({ ...pet, temperament: e.target.value })}
			/>
			<Checkbox
				id="Checkbox_3"
				label="Check if your pet is Vaccinated"
				value= 'yes'
				onChange={e => setPet({ ...pet, isVaccinated: e.target.checked })}
			/>
			<br/>
			<br/>
      <button
        className='btn waves-effect waves-light pink darken-2'
        onClick={addPet}
      >
        Add Pet
      </button>
    </div>
  )
}

export default Profile

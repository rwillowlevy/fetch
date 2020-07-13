import React, { useState } from 'react'
import {
  Modal,
  Button,
  TextInput,
  Select,
  Textarea,
  Checkbox
} from 'react-materialize'
import { useHistory } from 'react-router-dom'
import API from '../../utils/API'
import store from '../../utils/store'
import { addCurrentUser, addFile, addFileName } from '../../utils/actions'
import 'materialize-css'

function AddPetModal () {
  const [pet, setPet] = useState({
    name: '',
    image: '',
    age: '',
    size: '',
    bio: '',
    temperament: '',
    isVaccinated: false
  })
  const history = useHistory()
  const { currentUser } = store.getState()

  const handleFileUpload = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0])
    const sendFile = e.target.files[0];
    store.dispatch(addFile( sendFile ));
    store.dispatch(addFileName( sendFile.name ));
    const { file } = store.getState();
    // setFile(e.target.files[0])
    // setFileName(e.target.files[0].name)
    console.log("File State:", file);
    const imageFile = new FormData()
    imageFile.append('file', file);
    console.log("ImageFile:", imageFile);
    const uploadRes = await API.uploadImage(currentUser._id, imageFile)
    const { filePath } = uploadRes.data;
    console.log("Filepath:", filePath);
    setPet({...pet, image: filePath});
  };

  const addPet = async e => {
    e.preventDefault()
    console.log(pet)
    const petRes = await API.createPet(currentUser._id, pet)
    console.log('done')
    console.log(petRes)
    store.dispatch(addCurrentUser(petRes.data))
    history.push('/home')
  }
  return (
    <>
      <Modal
        actions={[
          <Button flat modal='close' node='butoon' waves='green'>
            Another Time
          </Button>,
          <Button modal='close' node='button' waves='green' onClick={addPet}>
            Add Pet
          </Button>
        ]}
        bottomSheet={false}
        fixedFooter={false}
        header='Add Pet'
        id='modal1'
        open={false}
        options={{
          dismissible: true,
          endingTop: '10%',
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          opacity: 0.5,
          outDuration: 250,
          preventScrolling: true,
          startingTop: '4%'
        }}
        trigger={<Button node='button'>Add Pet</Button>}
      >
        <TextInput
          id='TextInput-4'
          label='Pet Name'
          onChange={e => setPet({ ...pet, name: e.target.value })}
        />
        <TextInput
          id="TextInput-4"
          label="File"
          type="file"
          onChange={handleFileUpload}
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
            Gender
          </option>
          <option value='Female'>Female</option>
          <option value='Male'>Male</option>
        </Select>
        <Checkbox
          id='Checkbox_3'
          label='Check if your pet is Vaccinated'
          value='yes'
          onChange={e => setPet({ ...pet, isVaccinated: e.target.checked })}
        />
      </Modal>
    </>
  )
}

export default AddPetModal

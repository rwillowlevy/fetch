export function addCurrentUser (payload) {
  return {
    type: 'ADD_CURRENT_USER',
    payload
  }
}

export function updateCurrentUserPet (payload) {
  return {
    type: 'UPDATE_CURRENT_USER_PET',
    payload
  }
}

export function deleteCurrentUserPet () {
  return {
    type: 'DELETE_CURRENT_USER_PET',
  }
}

export function addAuth (payload) {
  return {
    type: 'ADD_AUTH',
    payload
  }
}

export function addFile (payload) {
  return {
    type: 'ADD_FILE',
    payload
  }
}

export function addFileName (payload) {
  return {
    type: 'ADD_FILENAME',
    payload
  }
}

export function addPets (payload){
  return {
    type: 'ADD_PETS',
    payload
  }
}

export function addMatches (payload){
  return {
    type: 'ADD_MATCHES',
    payload
  }
}

export function addRandomNum (payload){
  return {
    type: 'RANDOM_NUMBER',
    payload
  }
}
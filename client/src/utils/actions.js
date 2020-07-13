export function addCurrentUser (payload) {
  return {
    type: 'ADD_CURRENT_USER',
    payload
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
export default function reducer (state = {}, action) {
  switch (action.type) {
    case 'ADD_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      }
    case 'UPDATE_CURRENT_USER_PET':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          pets: [action.payload]
        }
      }
    case 'DELETE_CURRENT_USER_PET':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          pets: []
        }
      }
    case 'ADD_AUTH':
      return {
        ...state,
        Auth: action.payload
      }
    case 'ADD_FILE':
      return {
        ...state,
        file: action.payload
      }
    case 'ADD_FILENAME':
      return {
        ...state,
        fileName: action.payload
      }
    case 'ADD_PETS':
      return {
        ...state,
        allPets: action.payload
      }
    case 'ADD_MATCHES':
      return {
        ...state,
        matches: action.payload
      }
    case 'RANDOM_NUMBER':
      return {
        ...state,
        randomNumber: action.payload
      }
    default:
      return state
  }
}

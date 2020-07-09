export default function reducer( state = {}, action ){
    switch ( action.type ) { 
        case 'ADD_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload,
                petInfo: {}
            }
        case 'ADD_PET':
            return {
                ...state,
                petInfo: action.payload
            }
        default :
         return state
    }
}
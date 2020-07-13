export default function reducer( state = {}, action ){
    switch ( action.type ) { 
        case 'ADD_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload,
                petInfo: {}
            }
        case 'ADD_AUTH':
            return {
                ...state,
                Auth: action.payload
            }
        default :
         return state
    }
}
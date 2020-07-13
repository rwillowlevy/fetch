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
        
        default :
         return state
    }
}
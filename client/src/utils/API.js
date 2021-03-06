import axios from "axios";

export default {
  // USER  
  // Find user by ID
  getUserById: function(id) {
    return axios.get('/api/users/' + id)
  },
  // Find Matches
  getUserMatches: function(id) {
    return axios.get('api/users/matches/' + id)
  },
  // Login existing user
  loginUser: function(userData) {
    console.log(`userData ${userData}`)
    return axios.post('/api/users/login', userData)
  },
  // Create new user | signup
  createUser: function(userData) {
    return axios.post('/api/users/create', userData)
  },
  // Update user
  updateUser: function(id, userData) {
    return axios.put('/api/users/' + id, userData)
  },
  // Update password only
  updateUserPassword: function(id, pwData) {
    return axios.put('/api/users/password/' + id, pwData)
  },
  // Create new user | signup
  removeUser: function(id) {
    return axios.delete('/api/users/' + id)
  },
  verifyToken: function(token) {
    return axios.post('/api/users/verify/' + token)
  },

  // PET  
  // Find all pets
  getAllPets: function() {
    return axios.get('/api/pets')
  },
  // Find pet by ID
  getPetByID: function(id) {
    return axios.get('/api/pets/' + id)
  },
  // Upload pet image - https://www.youtube.com/watch?v=b6Oe2puTdMQ
  uploadPetImage: function(id, imageFile) {
    return axios.post('/api/pets/upload/' + id, imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  // Create new pet 
  createPet: function(id, petData) {
    return axios.post('/api/pets/create/' + id, petData)
  },
  // Update
  updatePet: function(id, petData) {
    return axios.put('/api/pets/' + id, petData)
  },
  // Create new user | signup
  removePet: function(id) {
    return axios.delete('/api/pets/' + id)
  },
  
  // SWIPE
  // Create swipe 
  createSwipe: function(swipeData) {
    return axios.post('/api/swipes', swipeData)
  },
  
};

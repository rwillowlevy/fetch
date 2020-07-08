import axios from "axios";

export default {
  // USER  
  // Find user by ID
  getUserById: function(id) {
    return axios.get('/api/users/' + id)
  },
  // Login existing user
  loginUser: function(userData) {
    return axios.post('/api/users/login', userData)
  },
  // Create new user | signup
  createUser: function(userData) {
    return axios.post('/api/users/create', userData)
  },
  // Update
  updateUser: function(id, userData) {
    return axios.put('/api/users/' + id, userData)
  },
  // Create new user | signup
  removeUser: function(id) {
    return axios.delete('/api/users/' + id)
  },

  // PET  
  // Find pet by ID
  getPetByID: function(id) {
    return axios.get('/api/pets/' + id)
  },
  // Create new pet 
  createPet: function(petData) {
    return axios.post('/api/pets/create', petData)
  },
  // Update
  updatePet: function(id, petData) {
    return axios.put('/api/pets/' + id, petData)
  },
  // Create new user | signup
  removeUser: function(id) {
    return axios.delete('/api/pets/' + id)
  }
  
};

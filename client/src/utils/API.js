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
  // Update user
  updateUser: function(id, userData) {
    return axios.put('/api/users/' + id, userData)
  },
  // Update password only
  updatePassword: function(id, pwData) {
    return axios.put('/api/users/password/' + id, pwData)
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
  uploadImage: function(imageFile) {
    return axios.post('/api/pets/upload', imageFile, {
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
  removeUser: function(id) {
    return axios.delete('/api/pets/' + id)
  }
  
};

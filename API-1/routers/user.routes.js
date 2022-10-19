const {signUp,signIn,getUsers} = require('../controllers/users')

const express = require('express');
const router = express.Router();

// ROUTES 

// ROUTE FOT GET DATA OF A USER
router.get('/getUsers', getUsers);

// // ROUTE FOT CREAT A USER
router.post('/Signup', signUp);

//ROUTE FOR LOGIN A USER
router.post('/Signin', signIn);

module.exports = router;
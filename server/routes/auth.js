const express = require('express');
const router = express.Router();
const { userSignupValidator, userSigninValidator, runValidation } = require('../utils/authValidator');

const { signup, allusers, deleteUser } = require('../controllers/auth')


router.post('/signup', userSignupValidator, runValidation, signup);
router.get('/userslist', allusers);
router.delete('/:id', deleteUser)

module.exports = router;
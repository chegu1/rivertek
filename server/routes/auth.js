const express = require('express');
const router = express.Router();
const { userSignupValidator, userSigninValidator, runValidation } = require('../utils/authValidator');

const { signup, allusers, deleteUser, updateUser, authUser } = require('../controllers/auth')


router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, authUser)
router.get('/userslist', allusers);
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


module.exports = router;
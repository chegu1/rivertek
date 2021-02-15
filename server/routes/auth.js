const express = require('express');
const router = express.Router();
const { userSignupValidator, userSigninValidator, runValidation } = require('../utils/authValidator');

const { signup } = require('../controllers/auth')


router.post('/signup', userSignupValidator, runValidation, signup);

module.exports = router;
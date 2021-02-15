const { check, validationResult } = require('express-validator');


exports.userSignupValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),

    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
]

exports.userSigninValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
]

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ error: errors.array()[0].msg })
    next()
}
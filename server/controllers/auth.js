const asynHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/Auth')


exports.signup = asynHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const checkUserExisting = await User.findOne({ email });

    if (checkUserExisting) return res.status(400).json({ error: 'email is already taken' })

    const user = await User.create({ name, email, password })

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_TOKEN, {
        expiresIn: '1d'
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token,
            message: 'You will get email notification once the admin approves.'
        })
    }

})
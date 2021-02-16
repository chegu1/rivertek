const expressAsyncHandler = require('express-async-handler');
const asynHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail')
const User = require('../models/Auth')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

exports.authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_TOKEN, {
        expiresIn: '1d'
    })
    if (user && user.isVerified && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            token: token
        })

    } else {
        res.status(401).json({ message: 'Invalid Email or Password' })

    }
})

exports.allusers = expressAsyncHandler(async (req, res) => {
    const getUsersList = await User.find();
    res.status(201).json({
        getUsersList,
        message: 'Fetched list of users'
    })

})

exports.updateUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.isVerified = true;
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: `Adding User to List`,
            html: `
                <h3>Dear ${user.name} we are Added you to our application,you can directly loginto the app</h3>
            `
        }
        console.log(emailData)
        const sening = await sgMail.send(emailData)
        console.log(sening)
        const updatedUser = await user.save()
        res.json({ updatedUser, message: 'user is verified and send  amail' })
    }
})

exports.deleteUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: `Removing User from List`,
            html: `
                <h3>Dear ${user.name} we are removed you from our application due to security reasons</>
            `
        }
        console.log(emailData)
        const sening = await sgMail.send(emailData)
        console.log(sening)

        await user.remove();

        res.json({ message: 'User is Removed and send a mail' })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})
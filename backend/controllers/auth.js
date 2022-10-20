const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator').default

const User = require('../models/user')
const { secret } = require('../config/auth.config')

const signin = async(req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({email: email})
        if(!user) return res.status(404).json({message: 'user not found'})
        const isPasswordValid = bcrypt.compare(password, user.password)
        if(!isPasswordValid) return res.status(400).json({message: 'Invalid password'})
        const token = jwt.sign({id: user._id}, secret, { expiresIn: '30d'})
        return res.status(200).json({message: 'Signin successful', user, token})
    } catch (error) {
        return res.status(500).json({message: `Internal server error, couldn't verify user`, error})
    }
}

const signup = async(req, res) => {
    const { username, email, password } = req.body

    if(!username) return res.status(400).json({message: 'Username is a required field'})
    if(!email || !validator.isEmail(email)) return res.status(400).json({message: 'Email is either empty or invalid'})
    if(!password || !validator.isStrongPassword(password)) return res.status(400).json({message: 'Password is either empty or not strong enough'})

    try {
        let isUsernameInUse = await User.findOne({username})
        let isEmailInUse = await User.findOne({email})
        if(isUsernameInUse || isEmailInUse) return res.status(500).json({message: 'This user exists already, try logging instead.'})
        const saltRounds = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        await User.create({username, email, password: hashedPassword })
        res.status(201).json({message: 'User created.'})
    } catch (error) {
        return res.status(500).json({message: `Internal server error, couldn't create user.`, error})
    }
}

module.exports = { signin, signup }
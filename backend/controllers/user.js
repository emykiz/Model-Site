const cloudinary = require('cloudinary').v2

const User = require('../models/user')

const search = async(req, res) => {
    const { query } = req.params

    try {
        const data = await User.find({'$match': { 'username': { '$regex': query, '$options': 'i'}}})
        if(!data) return res.status(404).json({message: 'User not found'})
        return res.status(200).json({message: 'User(s) found', data})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const editUser = async(req, res) => {
    const { id, desc, city, from } = req.body
}

const addProfileImage = async(req, res) => {
    const { id } = req.params
    const image = req.file.path

    try {
        const result = await cloudinary.uploader.upload(image, { folder: 'user-images' })
        if(!result) return res.status(400).json({message: 'Unable to upload image'})

        const user = await User.findOne({ _id: id })
        if(!user) return res.status(404).json({message: 'User not found'})

        const updatedUser = await User.findOneAndUpdate({ _id: id}, { profile_picture: result.url }, { new: true })
        if(!updatedUser) return res.status(500).json({message: 'An error occurred'})
        res.status(201).json({message: 'Profile picture added'})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const addCoverImage = async(req, res) => {
    const { id } = req.params
    const image = req.file.path

    try {
        const result = await cloudinary.uploader.upload(image, { folder: 'cover-images' })
        if(!result) return res.status(400).json({message: 'Unable to upload image'})

        const user = await User.findOne({ _id: id })
        if(!user) return res.status(404).json({message: 'User not found'})

        const updatedUser = await User.findOneAndUpdate({ _id: id}, { cover_picture: result.url }, { new: true })
        if(!updatedUser) return res.status(500).json({message: 'An error occurred'})
        res.status(201).json({message: 'Profile picture added'})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

module.exports = { search, editUser, addCoverImage, addProfileImage }
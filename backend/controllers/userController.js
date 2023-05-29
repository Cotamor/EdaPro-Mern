import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

// GET USER PROFILE (PRIVATE)
// TODO: this function is not used on Profile page(instead get info from userInfo stored in localStorage)
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// UPDATE USER PROFILE (PRIVATE)
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// GET USERS (ADMIN)
export const getUsers = asyncHandler(async (req, res) => {
  // console.log('Req from api', req.user)
  const users = await User.find({})
  res.status(200).json(users)
})
// GET USER BY ID (ADMIN)
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// DELETE USER (ADMIN)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    if (user.isAdmin) {
      res.status(400)
      throw new Error('Can not delete admin user')
    }
    await User.deleteOne({ _id: user._id })
    res.status(200).json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// UPDATE USER (ADMIN)
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin)

    const updatedUser = await user.save()

    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

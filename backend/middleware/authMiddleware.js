import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

// User must be authenticated
export const protect = async (req, res, next) => {
  let token

  // Read JWT from the 'jwt' cookie
  token = req.cookies.accessToken

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized, token failed.')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }

  // const token = req.cookies.accessToken

  // if (!token) {
  //   res.status(401)
  //   throw new Error('You are not authenticated.')
  // }
  // jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
  //   if (err) {
  //     res.status(403)
  //     throw new Error('Token is not valid')
  //   }
  //   req.user = await User.findById(payload.userId).select('-password')
  //   next()
  // })
}

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

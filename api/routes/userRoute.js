import express from 'express'
import {
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Only User
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)
// Only Admin
router.get('/', protect, admin, getUsers)
router.get('/:id', protect, admin, getUserById)
router.put('/:id', protect, admin, updateUser)
router.delete('/:id', protect, admin, deleteUser)

export default router

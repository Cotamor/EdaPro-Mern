import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js'

const router = express.Router()
// Private
router.post('/', protect, addOrderItems)
router.get('/mine', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid)
//Admin
router.get('/', protect, admin, getOrders)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered)

export default router

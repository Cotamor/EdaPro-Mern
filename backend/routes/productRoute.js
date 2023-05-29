import express from 'express'
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()
// Public
router.get('/', getProducts)
router.get('/top', getTopProducts)
router.get('/:id', getProductById)
// Private
router.post('/:id/reviews', protect, createProductReview)
// Admin
router.post('/', protect, admin, createProduct)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)
export default router

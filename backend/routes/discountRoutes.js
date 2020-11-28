import express from 'express'
const router = express.Router()
import {
  getDiscounts,
  getDiscountById,
  deleteDiscount,
  createDiscount,
  updateDiscount,
  getDiscountByCode,
 
} from '../controllers/discountController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getDiscounts).post(protect,  createDiscount)
router.route('/:code').get(getDiscountByCode)
router
  .route('/:id')
  .get(getDiscountById)
  .delete(protect, admin, deleteDiscount)
  .put(protect, admin, updateDiscount)

export default router

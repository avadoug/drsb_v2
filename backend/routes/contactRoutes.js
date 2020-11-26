import express from "express";
const router = express.Router();
import {
    Contact,
    getContacts,
    deleteContact,
    getContactById,

} from "../controllers/contactController.js";
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(Contact).get(protect, admin, getContacts)


router
  .route('/:id')
  .delete(protect, admin, deleteContact)
  .get(protect, admin, getContactById)


export default router;

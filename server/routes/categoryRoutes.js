import express from 'express';

import { createCategoryContoller, updateCategoryContoller, CategoryContoller, singleCategoryContoller,deleteCategoryContoller } from '../controllers/categoryController.js';

import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/create-category', requireSignIn, isAdmin, createCategoryContoller);
router.get('/get-category', CategoryContoller);
router.get('/single-category/:slug', singleCategoryContoller);
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryContoller);
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryContoller);

export default router;

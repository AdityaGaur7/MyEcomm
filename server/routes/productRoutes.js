import express from 'express';
import { createProductContoller, getAllProductsController, getSingleProductController, deleteProductController, updateProductController } from '../controllers/productController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, createProductContoller);
router.get('/get-product', getAllProductsController);
router.get('/get-product/:slug', getSingleProductController);
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);
router.put('/update-product/:pid', requireSignIn, isAdmin, updateProductController);



export default router;
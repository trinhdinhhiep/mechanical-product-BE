import { Router } from 'express';
import { ProductsController } from './products.controller';

const router = Router();

router.post('/categories', ProductsController.createCategory);
router.post('/products', ProductsController.createProduct);
router.get('/categories', ProductsController.getAllCategories);
router.get('/categories/:slug/products', ProductsController.getCategoryProducts);
router.get('/categories/:slug', ProductsController.getCategoryBySlug);
router.get('/products/hot', ProductsController.getHotProducts); // 🔥 THÊM ĐÂY - phải trước /products/:slug
router.get('/products/:slug', ProductsController.getProductBySlug);
router.get('/products', ProductsController.getAllProducts);
router.delete('/products/:id', ProductsController.deleteProduct);
router.delete('/categories/:id', ProductsController.deleteCategory);

export default router;

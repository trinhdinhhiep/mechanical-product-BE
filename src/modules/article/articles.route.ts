import { Router } from 'express';
import { ArticlesController } from './articles.controller';

const router = Router();

router.get('/featured', ArticlesController.getFeaturedArticles); // 🔥 THÊM ĐÂY - phải trước /:slug
router.get('/', ArticlesController.getAll); // GET  /api/articles
router.get('/:slug', ArticlesController.getBySlug); // GET  /api/articles/:slug
router.post('/', ArticlesController.create); // POST /api/articles
router.delete('/:id', ArticlesController.deleteById); // DELETE /api/articles/:id

export default router;

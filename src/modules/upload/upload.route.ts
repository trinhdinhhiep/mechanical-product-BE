import { Router, Request, Response } from 'express';
import { uploadProduct, uploadArticle } from './upload.middleware';

const router = Router();

router.post('/upload/product', uploadProduct.single('file'), (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ message: 'Không có file' });
  const url = `${process.env.UPLOAD_URL}/products/${req.file.filename}`;
  res.json({ url });
});

router.post('/upload/article', uploadArticle.single('file'), (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ message: 'Không có file' });
  const url = `${process.env.UPLOAD_URL}/articles/${req.file.filename}`;
  res.json({ url });
});

export default router;

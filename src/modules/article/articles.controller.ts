import { Request, Response } from 'express';
import { ArticlesService } from './articles.service';

export const ArticlesController = {
  async getAll(req: Request, res: Response) {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, parseInt(req.query.limit as string) || 10);
    const category = req.query.category as string | undefined;

    const result = await ArticlesService.getAll(page, limit, category);
    res.json(result);
  },

  async getBySlug(req: Request, res: Response) {
    const article = await ArticlesService.getBySlug(req.params.slug);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json({ data: article });
  },

  async create(req: Request, res: Response) {
    const { title, slug, excerpt, thumbnail, category, tags, author, published_at, content } =
      req.body;

    if (
      !title ||
      !slug ||
      !excerpt ||
      !thumbnail ||
      !category ||
      !author ||
      !published_at ||
      !content
    ) {
      return res.status(400).json({ message: 'Thiếu field bắt buộc' });
    }

    try {
      const article = await ArticlesService.create({
        title,
        slug,
        excerpt,
        thumbnail,
        category,
        tags,
        author,
        published_at,
        content,
      });
      return res.status(201).json({ data: article });
    } catch (err: any) {
      console.error('Create article error:', err);
      if (err.code === 'P2002') {
        return res.status(409).json({ message: 'Slug đã tồn tại' });
      }
      return res.status(500).json({ message: 'Lỗi server' });
    }
  },

  async deleteById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
      const result = await ArticlesService.deleteById(id);
      if (!result) {
        return res.status(404).json({ message: 'Article not found' });
      }
      res.json({ message: 'Article deleted successfully' });
    } catch (err: any) {
      console.error('Delete article error:', err);
      return res.status(500).json({ message: 'Lỗi server' });
    }
  },
};

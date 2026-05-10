import { Request, Response } from 'express';
import { SearchService } from './search.service';

export const SearchController = {
  async search(req: Request, res: Response) {
    const q = req.query.q as string;
    const limit = Math.min(20, parseInt(req.query.limit as string) || 10);

    if (!q || q.trim().length === 0) {
      return res.status(400).json({ message: 'Query không được để trống' });
    }

    try {
      const data = await SearchService.search(q, limit);
      return res.json({ data });
    } catch (err: any) {
      console.error('Search error:', err);
      return res.status(500).json({ message: 'Lỗi server' });
    }
  },
};

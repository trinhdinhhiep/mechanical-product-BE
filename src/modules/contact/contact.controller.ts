import { Request, Response } from 'express';
import { ContactService } from './contact.service';

export const ContactController = {
  async create(req: Request, res: Response) {
    const { name, email, phone, notes } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Tên không được để trống' });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Email không hợp lệ' });
    }

    try {
      const contact = await ContactService.create({ name, email, phone, notes });
      return res.status(201).json({ data: contact });
    } catch (err: any) {
      console.error('Contact error:', err);
      return res.status(500).json({ message: 'Lỗi server' });
    }
  },
};

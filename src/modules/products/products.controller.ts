import { Request, Response } from 'express';
import { ProductsService } from './products.service';

export const ProductsController = {
  async createCategory(req: Request, res: Response) {
    try {
      const category = await ProductsService.createCategory(req.body);
      res.status(201).json({ message: 'Category created!', data: category });
    } catch (error: any) {
      res.status(500).json({ message: 'Lỗi tạo Category', error: error.message });
    }
  },

  async createProduct(req: Request, res: Response) {
    try {
      const product = await ProductsService.createProduct(req.body);
      res.status(201).json({ message: 'Product created!', data: product });
    } catch (error: any) {
      res.status(500).json({ message: 'Lỗi tạo Product', error: error.message });
    }
  },

  async getAllCategories(req: Request, res: Response) {
    const categories = await ProductsService.getAllCategories();
    res.json({ data: categories });
  },

  async getCategoryBySlug(req: Request, res: Response) {
    const category = await ProductsService.getCategoryBySlug(req.params.slug as string);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ data: category });
  },

  async getProductBySlug(req: Request, res: Response) {
    const product = await ProductsService.getProductBySlug(req.params.slug as string);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ data: product });
  },

  async deleteProduct(req: Request, res: Response) {
    try {
      const result = await ProductsService.deleteProduct(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: 'Lỗi xóa Product', error: error.message });
    }
  },

  async deleteCategory(req: Request, res: Response) {
    try {
      const result = await ProductsService.deleteCategory(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json({ message: 'Category deleted successfully' });
    } catch (error: any) {
      // Bao gồm cả lỗi "còn products" từ service
      res.status(400).json({ message: error.message });
    }
  },
};

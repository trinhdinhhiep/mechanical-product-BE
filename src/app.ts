import express from 'express';
import cors from 'cors';
import path from 'path';
import articlesRouter from './modules/article/articles.route';
import productsRouter from './modules/products/products.route';
import uploadRouter from './modules/upload/upload.route';
import searchRouter from './modules/search/search.route';
import contactRoute from './modules/contact/contact.route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/articles', articlesRouter);
app.use('/api', productsRouter);
app.use('/api', uploadRouter);

if (process.env.NODE_ENV === 'development') {
  app.use('/uploads', express.static(path.resolve(process.env.UPLOAD_DIR!)));
}

app.use('/api/search', searchRouter);

app.use('/api/contacts', contactRoute);

export default app;

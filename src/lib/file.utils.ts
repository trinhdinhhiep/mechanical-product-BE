// src/lib/file.utils.ts
import fs from 'fs/promises';
import path from 'path';

// Đọc từ env thay vì hardcode __dirname
const UPLOADS_DIR = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR) // production: absolute path từ cPanel
  : path.resolve('src/uploads'); // fallback local

const UPLOAD_URL = process.env.UPLOAD_URL ?? 'http://localhost:3000/uploads';

export function extractLocalImageUrls(obj: any): string[] {
  const urls = new Set<string>();

  function traverse(value: any) {
    if (!value) return;
    if (typeof value === 'string') {
      // Match theo UPLOAD_URL thay vì hardcode "/uploads/"
      if (value.startsWith(UPLOAD_URL)) urls.add(value);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(traverse);
      return;
    }
    if (typeof value === 'object') Object.values(value).forEach(traverse);
  }

  traverse(obj);
  return Array.from(urls);
}

export async function deleteLocalImages(obj: any) {
  const imageUrls = extractLocalImageUrls(obj);

  const filePaths = imageUrls.map(url => {
    // Bóc phần path sau UPLOAD_URL, ghép vào UPLOADS_DIR
    // vd: "http://localhost:3000/uploads/images/articles/5.jpg"
    //   → "/articles/5.jpg" → "src/uploads/images/articles/5.jpg"
    const relativePath = url.replace(UPLOAD_URL, '');
    return path.join(UPLOADS_DIR, relativePath);
  });

  await Promise.allSettled(filePaths.map(p => fs.unlink(p)));
}

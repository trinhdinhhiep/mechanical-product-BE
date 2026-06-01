import { deleteLocalImages } from '../../lib/file.utils';
import prisma from '../../lib/prisma';

function parseArticle(article: any) {
  return {
    ...article,
    tags: JSON.parse(article.tags),
    published_at: article.published_at.toISOString().split('T')[0],
  };
}

export const ArticlesService = {
  async getAll(page: number, limit: number, category?: string) {
    const where = category ? { category } : {};

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: { published_at: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          thumbnail: true,
          category: true,
          tags: true,
          author: true,
          published_at: true,
        },
      }),
      prisma.article.count({ where }),
    ]);

    return {
      data: articles.map(parseArticle),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getBySlug(slug: string) {
    const article = await prisma.article.findUnique({ where: { slug } });
    if (!article) return null;
    return parseArticle(article);
  },

  async create(data: any) {
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        thumbnail: data.thumbnail,
        category: data.category,
        tags: JSON.stringify(data.tags),
        author: data.author,
        content: data.content,
        published_at: new Date(data.published_at),
        is_featured: data.is_featured ?? false, // 🔥 THÊM ĐÂY (optional từ request)
      },
    });
    return parseArticle(article);
  },

  // 🔥 GET /articles/featured — Bài viết featured (is_featured = true)
  async getFeaturedArticles() {
    const featuredArticles = await prisma.article.findMany({
      where: { is_featured: true },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        thumbnail: true,
        author: true,
      },
      orderBy: { published_at: 'desc' },
      take: 3, // Lấy 3 bài featured mới nhất
    });
    return featuredArticles;
  },

  // DELETE /api/articles/:id
  async deleteById(id: number) {
    const article = await prisma.article.findUnique({ where: { id } }); // bỏ select
    if (!article) return null;

    await prisma.article.delete({ where: { id } });
    await deleteLocalImages(article); // 👈
    return true;
  },
};

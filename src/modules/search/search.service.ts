import prisma from '../../lib/prisma';

export const SearchService = {
  async search(q: string, limit: number = 10) {
    const keyword = q.trim();
    const take = Math.min(limit, 20);

    const [products, articles] = await Promise.all([
      prisma.product.findMany({
        where: {
          OR: [{ title: { contains: keyword } }, { slug: { contains: keyword } }],
        },
        select: {
          id: true,
          slug: true,
          title: true,
          image: true,
          category: {
            select: { slug: true, name: true },
          },
        },
        take,
        orderBy: { created_at: 'desc' },
      }),

      prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: keyword } },
            { excerpt: { contains: keyword } },
            { tags: { contains: keyword } },
          ],
        },
        select: {
          id: true,
          slug: true,
          title: true,
          thumbnail: true,
          category: true,
          published_at: true,
        },
        take,
        orderBy: { published_at: 'desc' },
      }),
    ]);

    return {
      products: products.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        image: p.image,
        categorySlug: p.category.slug,
        categoryName: p.category.name,
      })),
      articles: articles.map(a => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        thumbnail: a.thumbnail,
        category: a.category,
        publishedAt: a.published_at,
      })),
      total: products.length + articles.length,
    };
  },
};

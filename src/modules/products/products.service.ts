import { deleteLocalImages } from '../../lib/file.utils';
import prisma from '../../lib/prisma';

function parseCategory(category: any) {
  return {
    ...category,
    description_text: category.description_text,
    features: category.features,
    products: category.products?.map((p: any) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      image: p.image,
      link: p.link,
    })),
  };
}

function parseProduct(product: any) {
  return {
    ...product,
    specs: product.specs,
    detail: product.detail
      ? {
          ...product.detail,
          points: product.detail.points,
          description_text: product.detail.description_text,
        }
      : null,
  };
}

export const ProductsService = {
  // POST /categories — create new category (admin)
  async createCategory(data: any) {
    return await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        subtitle: data.subtitle,
        banner_image: data.banner_image,
        description_image: data.description_image,
        description_text: data.description_text,
        features: data.features,
      },
    });
  },

  // POST /products — create new product (admin)
  async createProduct(data: any) {
    const { detail, category_id, ...productData } = data;

    return await prisma.product.create({
      data: {
        ...productData,
        is_hot: data.is_hot ?? false,
        category: {
          connect: { id: category_id }, // Bắt buộc Category phải tồn tại
        },
        detail: {
          create: {
            code: detail.code,
            points: detail.points,
            description_text: detail.description_text,
          },
        },
      },
      include: {
        detail: true,
        category: true,
      },
    });
  },

  // GET /categories — navbar + all products section
  async getAllCategories() {
    const categories = await prisma.category.findMany({
      orderBy: { created_at: 'asc' },
      include: {
        products: {
          select: {
            id: true,
            slug: true,
            title: true,
            image: true,
            link: true,
          },
        },
      },
    });
    return categories.map(parseCategory);
  },

  // GET /categories/:slug — category page
  async getCategoryBySlug(slug: string) {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          select: {
            id: true,
            slug: true,
            title: true,
            image: true,
            link: true,
          },
        },
      },
    });
    if (!category) return null;
    return parseCategory(category);
  },

  // GET /products/:slug — product detail page
  async getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        detail: true,
        category: {
          include: {
            products: {
              select: {
                id: true,
                slug: true,
                title: true,
                image: true,
                link: true,
              },
            },
          },
        },
      },
    });
    if (!product) return null;

    const related = product.category.products.filter(p => p.slug !== slug);

    return {
      ...parseProduct(product),
      related_products: related,
    };
  },

  // 🔥 GET /products/hot — Sản phẩm bán chạy (is_hot = true)
  async getHotProducts() {
    const hotProducts = await prisma.product.findMany({
      where: { is_hot: true },
      select: {
        id: true,
        slug: true,
        title: true,
        image: true,
        link: true,
      },
      orderBy: { updated_at: 'desc' },
      take: 4, // Giới hạn 4 sản phẩm
    });
    return hotProducts;
  },

  // GET /categories/:slug/products?page=1&limit=4
  async getCategoryProducts(slug: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where: { category: { slug } },
        select: {
          id: true,
          slug: true,
          title: true,
          image: true,
          link: true,
        },
        skip,
        take: limit,
        orderBy: { created_at: 'asc' },
      }),
      prisma.product.count({
        where: { category: { slug } },
      }),
    ]);

    return {
      data: products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },

  // GET /products?page=1&limit=12&sort=default
  async getAllProducts(page: number, limit: number, sort: string) {
    const skip = (page - 1) * limit;

    const orderBy =
      sort === 'name_asc'
        ? { title: 'asc' as const }
        : sort === 'name_desc'
          ? { title: 'desc' as const }
          : { created_at: 'asc' as const }; // default

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        select: {
          id: true,
          slug: true,
          title: true,
          image: true,
          link: true,
        },
        skip,
        take: limit,
        orderBy,
      }),
      prisma.product.count(),
    ]);

    return {
      data: products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },

  // DELETE /products/:id
  async deleteProduct(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { detail: true }, // fetch full + detail để traverse ảnh trong đó luôn
    });
    if (!product) return null;

    await prisma.$transaction([
      prisma.productDetail.deleteMany({ where: { product_id: id } }),
      prisma.product.delete({ where: { id } }),
    ]);
    await deleteLocalImages(product); // 👈
    return true;
  },

  // DELETE /categories/:id
  async deleteCategory(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          include: { detail: true }, // fetch full products + detail để traverse ảnh
        },
      },
    });
    if (!category) return null;

    if (category.products.length > 0) {
      throw new Error(`Category còn ${category.products.length} sản phẩm. Xóa hết products trước.`);
    }

    await prisma.category.delete({ where: { id } });
    await deleteLocalImages(category); // 👈
    return true;
  },

  // update product hot status (admin)
  async updateProductHotStatus(id: string, is_hot: boolean) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return null;
    return await prisma.product.update({ where: { id }, data: { is_hot } });
  },
};

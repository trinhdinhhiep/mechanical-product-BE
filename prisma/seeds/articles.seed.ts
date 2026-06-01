import { PrismaClient } from '@prisma/client';

type Block =
  | ParagraphBlock
  | HeadingBlock
  | ImageBlock
  | ImageGalleryBlock
  | VideoBlock
  | TableOfContentsBlock
  | TableBlock
  | ListBlock
  | CalloutBlock
  | DividerBlock;

interface ParagraphBlock {
  type: 'paragraph';

  data: { text: string };
}

interface HeadingBlock {
  type: 'heading';

  data: { level: 2 | 3; text: string; anchor: string };
}

interface ImageBlock {
  type: 'image';

  data: { src: string; caption?: string; alt: string };
}

interface ImageGalleryBlock {
  type: 'image_gallery';

  data: {
    images: { src: string; caption?: string; alt: string }[];
  };
}

interface VideoBlock {
  type: 'video';

  data: { url: string; caption?: string };
}

interface TableOfContentsBlock {
  type: 'table_of_contents';

  data: {
    items: { label: string; anchor: string }[];
  };
}

interface TableBlock {
  type: 'table';

  data: {
    caption?: string;

    columns: string[];

    rows: string[][];
  };
}
interface ListBlock {
  type: 'list';

  data: {
    style: 'ordered' | 'unordered';

    items: string[];
  };
}

interface CalloutBlock {
  type: 'callout';

  data: {
    variant: 'info' | 'success' | 'warning';

    title?: string;

    text: string;
  };
}
interface DividerBlock {
  type: 'divider';

  data: Record<string, never>;
}

interface Article {
  id: number;

  slug: string;

  title: string;

  excerpt: string;

  thumbnail: string;

  category: string;

  tags: string[];

  author: string;

  published_at: string;

  content: Block[];

  is_featured?: boolean; // 🔥 THÊM ĐÂY
}

// ─────────────────────────────────────────────────────────────

// BÀI 1: Chương trình Tết Sum Vầy

// ─────────────────────────────────────────────────────────────

const article1: Article = {
  id: 1,

  slug: 'chuong-trinh-tet-sum-vay-xuan-on-dang-tai-83mec',

  title:
    'Nhà Máy Z183: Chương Trình "Tết Sum Vầy – Xuân Ơn Đảng" Gắn Kết Tinh Thần Đoàn Kết, Sẻ Chia',

  excerpt:
    'Nhà máy Z183 tổ chức chương trình Tết Sum Vầy – Xuân Ơn Đảng nhằm tri ân cán bộ, công nhân viên, thắt chặt tinh thần đoàn kết trước thềm năm mới.',

  thumbnail: 'https://hevtech.vn/uploads/images/articles/1.jpg',

  category: 'Tin tức',

  tags: ['sự kiện', 'tết 2025', 'đoàn kết', 'Z183'],

  author: 'Ban Biên Tập 83MEC',

  published_at: '2025-01-18',

  is_featured: true, // 🔥 Featured article

  content: [
    {
      type: 'table_of_contents',

      data: {
        items: [
          { label: 'Ý nghĩa chương trình', anchor: 'y-nghia' },

          { label: 'Các hoạt động nổi bật', anchor: 'hoat-dong' },

          { label: 'Hình ảnh sự kiện', anchor: 'hinh-anh' },

          { label: 'Phát biểu lãnh đạo', anchor: 'phat-bieu' },
        ],
      },
    },

    {
      type: 'paragraph',

      data: {
        text: 'Trong không khí rộn ràng đón chào xuân Ất Tỵ 2025, Nhà máy Z183 – đơn vị trực thuộc Bộ Quốc Phòng – đã long trọng tổ chức chương trình "Tết Sum Vầy – Xuân Ơn Đảng" dành cho toàn thể cán bộ, chiến sĩ và công nhân viên. Đây là hoạt động thường niên mang ý nghĩa sâu sắc, thể hiện sự quan tâm của Đảng ủy và Ban Giám đốc nhà máy đối với đời sống tinh thần của người lao động.',
      },
    },

    {
      type: 'heading',

      data: { level: 2, text: 'Ý Nghĩa Chương Trình', anchor: 'y-nghia' },
    },

    {
      type: 'paragraph',

      data: {
        text: 'Chương trình không chỉ là dịp để mọi người cùng nhau vui Tết, mà còn là cơ hội để lãnh đạo nhà máy tri ân những đóng góp không mệt mỏi của từng cán bộ, công nhân trong suốt một năm qua. Tinh thần đoàn kết, chia sẻ và gắn bó chính là nền tảng để Z183 vươn lên hoàn thành xuất sắc mọi nhiệm vụ được giao.',
      },
    },

    {
      type: 'callout',

      data: {
        variant: 'success',

        title: 'Thành tích năm 2024',

        text: 'Nhà máy Z183 hoàn thành 118% kế hoạch sản xuất năm 2024, được Bộ Quốc Phòng tặng Bằng khen xuất sắc.',
      },
    },

    {
      type: 'heading',

      data: { level: 2, text: 'Các Hoạt Động Nổi Bật', anchor: 'hoat-dong' },
    },

    {
      type: 'list',

      data: {
        style: 'unordered',

        items: [
          'Trao tặng quà Tết cho 100% cán bộ, công nhân viên và gia đình chính sách',

          'Chương trình văn nghệ chào xuân do chính công nhân viên biểu diễn',

          'Hội thi gói bánh chưng truyền thống, tạo không khí Tết ấm áp',

          'Bốc thăm may mắn với nhiều phần quà có giá trị',

          'Bữa tiệc tất niên đầm ấm, gắn kết toàn thể nhà máy',
        ],
      },
    },

    {
      type: 'heading',

      data: { level: 2, text: 'Hình Ảnh Sự Kiện', anchor: 'hinh-anh' },
    },

    {
      type: 'image_gallery',

      data: {
        images: [
          {
            src: 'https://hevtech.vn/uploads/images/articles/1.jpg',

            caption: 'Toàn cảnh buổi lễ Tết Sum Vầy tại hội trường lớn',

            alt: 'Lễ Tết Sum Vầy Z183',
          },

          {
            src: 'https://hevtech.vn/uploads/images/articles/2.jpg',

            caption: 'Ban Giám đốc trao quà cho cán bộ công nhân viên',

            alt: 'Trao quà Tết Z183',
          },

          {
            src: 'https://hevtech.vn/uploads/images/articles/3.jpg',

            caption: 'Hội thi gói bánh chưng truyền thống',

            alt: 'Gói bánh chưng Z183',
          },

          {
            src: 'https://hevtech.vn/uploads/images/articles/4.jpg',

            caption: 'Chương trình văn nghệ chào xuân Ất Tỵ 2025',

            alt: 'Văn nghệ chào xuân Z183',
          },
        ],
      },
    },

    {
      type: 'heading',

      data: { level: 2, text: 'Phát Biểu Lãnh Đạo', anchor: 'phat-bieu' },
    },

    {
      type: 'callout',

      data: {
        variant: 'info',

        title: 'Giám đốc Nhà máy Z183 phát biểu',

        text: '"Chương trình Tết Sum Vầy là minh chứng cho tinh thần đại gia đình Z183 – nơi mỗi cán bộ, công nhân đều được trân trọng và yêu thương. Chúng ta cùng nhau bước vào năm mới với khí thế mạnh mẽ, quyết tâm hoàn thành và hoàn thành vượt mức mọi chỉ tiêu kế hoạch."',
      },
    },

    {
      type: 'paragraph',

      data: {
        text: 'Chương trình khép lại trong không khí ấm áp và đầy xúc động, để lại những kỷ niệm đẹp trong lòng mỗi cán bộ, công nhân viên. Xuân Ất Tỵ 2025 – một mùa xuân mới với những hy vọng và khát vọng mới của tập thể Z183.',
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────

// BÀI 2: Hộp Đồ Nghề Đa Năng Kiểu Quân Dụng

// ─────────────────────────────────────────────────────────────

const article2: Article = {
  id: 2,

  slug: 'hop-do-nghe-da-nang-kieu-quan-dung-83mec-viet-nam',

  title: 'Thùng Đồ Nghề Đa Năng Kiểu Quân Dụng 83MEC Việt Nam – Giải Pháp Xuất Khẩu B2B Hàng Đầu',

  excerpt:
    'Thùng đồ nghề quân dụng 83MEC – sản phẩm đạt tiêu chuẩn xuất khẩu B2B, độ bền cao, chống va đập, chống nước, đang được thị trường quốc tế ưa chuộng.',

  thumbnail: 'https://hevtech.vn/uploads/images/articles/5.jpg',

  category: 'Sản phẩm',

  tags: ['thùng đồ nghề', 'xuất khẩu', 'B2B', 'quân dụng'],

  author: 'Ban Biên Tập 83MEC',

  published_at: '2024-12-01',

  is_featured: true, // 🔥 Featured article

  content: [
    {
      type: 'paragraph',

      data: {
        text: 'Dòng sản phẩm thùng đồ nghề quân dụng 83MEC được thiết kế đặc biệt cho các chuyên gia kỹ thuật, quân đội và các đội lực lượng vũ trang trên toàn thế giới.',
      },
    },
  ],
};

const fakeArticles: Article[] = [
  {
    id: 5,
    slug: 'san-pham-co-khi-chinh-xac-z183',
    title: 'Sản Phẩm Cơ Khí Chính Xác Z183 – Độ Chính Xác Cao, Đáp Ứng Tiêu Chuẩn Quốc Tế',
    excerpt:
      'Z183 cung cấp các sản phẩm cơ khí chính xác đạt tiêu chuẩn quốc tế, phục vụ công nghiệp quốc phòng và dân sự.',
    thumbnail: 'https://hevtech.vn/uploads/images/articles/19.jpg',
    category: 'Sản phẩm',
    tags: ['cơ khí', 'chính xác', 'Z183'],
    author: 'Ban Biên Tập 83MEC',
    published_at: '2024-01-10',
    is_featured: false,
    content: [
      {
        type: 'paragraph',
        data: { text: 'Nội dung bài viết về sản phẩm cơ khí chính xác Z183.' },
      },
    ],
  },
  {
    id: 6,
    slug: 'hop-dung-thiet-bi-quan-su-chong-am',
    title: 'Hộp Đựng Thiết Bị Quân Sự Chống Ẩm – Bảo Vệ Tối Ưu Trong Mọi Điều Kiện',
    excerpt:
      'Hộp chống ẩm quân sự 83MEC bảo vệ thiết bị điện tử, khí tài trong môi trường khắc nghiệt.',
    thumbnail: 'https://hevtech.vn/uploads/images/articles/20.jpg',
    category: 'Sản phẩm',
    tags: ['hộp chống ẩm', 'quân sự', '83MEC'],
    author: 'Ban Biên Tập 83MEC',
    published_at: '2024-02-15',
    is_featured: true, // 🔥 Featured article
    content: [
      {
        type: 'paragraph',
        data: {
          text: 'Nội dung bài viết về hộp đựng thiết bị quân sự chống ẩm.',
        },
      },
    ],
  },
  {
    id: 7,
    slug: 'z183-ky-niem-30-nam-thanh-lap',
    title: 'Nhà Máy Z183 Kỷ Niệm 30 Năm Thành Lập – Hành Trình Phát Triển Và Trưởng Thành',
    excerpt:
      'Lễ kỷ niệm 30 năm thành lập Nhà máy Z183 – nhìn lại chặng đường xây dựng và phát triển.',
    thumbnail: 'https://hevtech.vn/uploads/images/articles/21.jpg',
    category: 'Tin tức',
    tags: ['kỷ niệm', 'Z183', '30 năm'],
    author: 'Ban Biên Tập 83MEC',
    published_at: '2024-04-20',
    is_featured: false,
    content: [
      {
        type: 'paragraph',
        data: {
          text: 'Nội dung bài viết kỷ niệm 30 năm thành lập nhà máy Z183.',
        },
      },
    ],
  },
  {
    id: 8,
    slug: 'xuat-khau-thung-sat-sang-thi-truong-eu',
    title: 'Xuất Khẩu Thùng Sắt Quân Dụng Sang Thị Trường EU – 83MEC Mở Rộng Hợp Tác Quốc Tế',
    excerpt:
      '83MEC ký kết hợp đồng xuất khẩu thùng sắt quân dụng sang thị trường EU, mở rộng tầm ảnh hưởng quốc tế.',
    thumbnail: 'https://hevtech.vn/uploads/images/articles/22.jpg',
    category: 'Tin tức',
    tags: ['xuất khẩu', 'EU', 'thùng sắt'],
    author: 'Ban Biên Tập 83MEC',
    published_at: '2024-05-05',
    is_featured: false,
    content: [
      {
        type: 'paragraph',
        data: {
          text: 'Nội dung bài viết về xuất khẩu thùng sắt sang thị trường EU.',
        },
      },
    ],
  },
  {
    id: 9,
    slug: 'thung-cong-cu-chong-va-dap-cho-ky-thuat-vien',
    title: 'Thùng Công Cụ Chống Va Đập Cho Kỹ Thuật Viên – Tiêu Chuẩn Công Nghiệp',
    excerpt:
      'Dòng thùng công cụ chống va đập 83MEC thiết kế riêng cho kỹ thuật viên công nghiệp và quân sự.',
    thumbnail: 'https://hevtech.vn/uploads/images/articles/1.jpg',
    category: 'Sản phẩm',
    tags: ['thùng công cụ', 'kỹ thuật viên', 'chống va đập'],
    author: 'Ban Biên Tập 83MEC',
    published_at: '2024-06-12',
    is_featured: false,
    content: [
      {
        type: 'paragraph',
        data: { text: 'Nội dung bài viết về thùng công cụ chống va đập.' },
      },
    ],
  },
  {
    id: 10,
    slug: 'z183-dat-chung-nhan-iso-9001-2015',
    title: 'Z183 Đạt Chứng Nhận ISO 9001:2015 – Cam Kết Chất Lượng Sản Xuất',
    excerpt:
      'Nhà máy Z183 chính thức được cấp chứng nhận ISO 9001:2015, khẳng định hệ thống quản lý chất lượng đạt chuẩn quốc tế.',
    thumbnail: 'https://hevtech.vn/uploads/images/articles/2.jpg',
    category: 'Tin tức',
    tags: ['ISO 9001', 'chất lượng', 'Z183'],
    author: 'Ban Biên Tập 83MEC',
    published_at: '2024-07-18',
    is_featured: false,
    content: [
      {
        type: 'paragraph',
        data: {
          text: 'Nội dung bài viết về chứng nhận ISO 9001:2015 của Z183.',
        },
      },
    ],
  },
  {
    id: 11,
    slug: 'hop-sat-dung-dan-tieu-lien-ak',
    title: 'Hộp Sắt Đựng Đạn Tiểu Liên AK – Sản Xuất Theo Tiêu Chuẩn Bộ Quốc Phòng',
    excerpt:
      'Hộp sắt đựng đạn AK do Z183 sản xuất theo đúng tiêu chuẩn kỹ thuật quân sự của Bộ Quốc Phòng Việt Nam.',
    thumbnail: 'https://hevtech.vn/uploads/images/articles/3.jpg',
    category: 'Sản phẩm',
    tags: ['hộp đạn', 'AK', 'Bộ Quốc Phòng'],
    author: 'Ban Biên Tập 83MEC',
    published_at: '2024-08-22',
    is_featured: false,
    content: [
      {
        type: 'paragraph',
        data: { text: 'Nội dung bài viết về hộp sắt đựng đạn tiểu liên AK.' },
      },
    ],
  },
  {
    id: 12,
    slug: 'hop-tac-voi-doi-tac-han-quoc-cung-ung-linh-kien',
    title: 'Z183 Hợp Tác Với Đối Tác Hàn Quốc – Cung Ứng Linh Kiện Cơ Khí Chính Xác',
    excerpt:
      'Nhà máy Z183 ký kết hợp tác với đối tác Hàn Quốc trong lĩnh vực cung ứng linh kiện cơ khí chính xác.',
    thumbnail: 'https://hevtech.vn/uploads/images/articles/4.jpg',
    category: 'Tin tức',
    tags: ['hợp tác', 'Hàn Quốc', 'linh kiện'],
    author: 'Ban Biên Tập 83MEC',
    published_at: '2024-09-30',
    is_featured: false,
    content: [
      {
        type: 'paragraph',
        data: { text: 'Nội dung bài viết về hợp tác với đối tác Hàn Quốc.' },
      },
    ],
  },
];

const mockArticles: Article[] = [article1, article2, ...fakeArticles];

export async function seedArticles(prisma: PrismaClient) {
  console.log('Cleaning articles...');

  await prisma.article.deleteMany();

  console.log('Seeding articles...');

  for (const article of mockArticles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        thumbnail: article.thumbnail,
        category: article.category,
        tags: JSON.stringify(article.tags),
        author: article.author,
        published_at: new Date(article.published_at),
        is_featured: article.is_featured ?? false, // 🔥 THÊM ĐÂY
        content: article.content as any,
      },
    });
  }

  console.log('Done!');
}

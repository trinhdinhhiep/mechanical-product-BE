import { PrismaClient } from '@prisma/client';

// ─── SEED DATA ───────────────────────────────────────────────

const categories = [
  {
    slug: 'thiet-bi-pccc-bqp',
    name: 'Thiết bị PCCC Bộ Quốc Phòng',
    subtitle: 'THIẾT BỊ PHÒNG CHÁY CHỮA CHÁY',
    banner_image: 'https://hevtech.vn/uploads/Banner-thiet-bi-pccc-bqp.jpg',
    description_image: 'https://hevtech.vn/uploads/Decription-thiet-bi-PCCC.jpg',
    description_text: [
      '<strong>Công ty Cơ khí 83 (83MEC)</strong> là đơn vị tiên phong sản xuất thiết bị PCCC tại Việt Nam.',
      'Kể từ năm 1999, 83MEC không ngừng phát triển với hàng loạt sản phẩm mang <strong>thương hiệu BQP</strong>.',
      'Với công nghệ hiện đại và đội ngũ kỹ sư giàu kinh nghiệm, các sản phẩm luôn đảm bảo độ tin cậy cao.',
      'Sản phẩm được sử dụng rộng rãi từ khu công nghiệp đến các công trình trọng điểm toàn quốc.',
      '<strong>83MEC – Người bảo vệ thầm lặng</strong> trong công tác phòng cháy và chữa cháy.',
    ],
    features: [
      {
        icon: '♻️',
        title: 'Thân thiện với môi trường',
        bg: 'bg-green-100',
        border: 'border-green-600',
        iconColor: 'text-green-700',
      },
      {
        icon: '💡',
        title: 'Công nghệ hiện đại',
        bg: 'bg-blue-100',
        border: 'border-blue-700',
        iconColor: 'text-blue-800',
      },
      {
        icon: '🎯',
        title: 'Chính sách khách hàng tốt',
        bg: 'bg-orange-100',
        border: 'border-orange-600',
        iconColor: 'text-orange-700',
      },
    ],
  },
  {
    slug: 'tru-cuu-hoa-BQP',
    name: 'Trụ cứu hỏa BQP',
    subtitle: 'TRỤ CỨU HỎA BỘ QUỐC PHÒNG',
    banner_image: 'https://hevtech.vn/uploads/Banner-tru-cuu-hoa-3-cua-Bo-Quoc-Phong-1.jpg',
    description_image: 'https://hevtech.vn/uploads/Decription-tru-cuu-hoa-BQP.jpg',
    description_text: [
      '<strong>Dòng sản phẩm hộp đựng quân dụng 83MEC</strong> được sản xuất theo tiêu chuẩn quân sự nghiêm ngặt.',
      'Vỏ hộp dập từ thép tấm cán nguội, qua xử lý sơn tĩnh điện chống gỉ bền vững.',
      'Đáp ứng yêu cầu xuất khẩu B2B sang thị trường Mỹ, EU, Úc và Đông Nam Á.',
      'Năng lực sản xuất 50.000 sản phẩm/tháng với quy trình ISO 9001:2015.',
      '<strong>83MEC – Giải pháp xuất khẩu quân dụng hàng đầu Việt Nam.</strong>',
    ],
    features: [
      {
        icon: '🛡️',
        title: 'Chống va đập, chống nước',
        bg: 'bg-green-100',
        border: 'border-green-600',
        iconColor: 'text-green-700',
      },
      {
        icon: '🌍',
        title: 'Đạt chuẩn xuất khẩu quốc tế',
        bg: 'bg-blue-100',
        border: 'border-blue-700',
        iconColor: 'text-blue-800',
      },
      {
        icon: '⚙️',
        title: 'OEM/ODM theo yêu cầu',
        bg: 'bg-orange-100',
        border: 'border-orange-600',
        iconColor: 'text-orange-700',
      },
    ],
  },
  {
    slug: 'binh-chua-chay-BQP',
    name: 'Bình chữa cháy',
    subtitle: 'BÌNH CHỮA CHÁY BỘ QUỐC PHÒNG',
    banner_image: 'https://hevtech.vn/uploads/Banner-binh-chua-chay-Bo-Quoc-Phong-_2_.jpeg',
    description_image: 'https://hevtech.vn/uploads/Decription-binh-chua-chay-83MEC-1.jpeg',
    description_text: [
      'Thiết kế thông minh, dễ sử dụng, vận hành linh hoạt.',
      'Nguồn gốc rõ ràng: Sản xuất trực tiếp bởi 83MEC – Đơn vị thuộc Bộ Quốc Phòng, uy tín hàng đầu về thiết bị PCCC.',
      'Sản phẩm được kiểm định chặt chẽ bởi cơ quan chuyên ngành Cục PCCC.',
      'Đạt chuẩn chất lượng: Sản xuất theo TCVN, ISO 9001:2015 & ISO 14001:2015, đảm bảo chất lượng – an toàn – bền bỉ.',
      'Đa dạng mẫu mã: Bình gốc nước, bình bột ABC (xách tay, xe đẩy), bình khí CO2, bình tự động phù hợp mọi nhu cầu.',
      'Hiệu quả dập tắt mọi loại đám cháy: Điện, xăng dầu, hóa chất, tại các khu vực nhà máy – xưởng, văn phòng, gia đình…',
      'Giá cả cạnh tranh – trực tiếp từ nhà sản xuất.',
      'Chính sách bảo hành, hậu mãi chuyên nghiệp.',
    ],
    features: [
      {
        icon: '🔥',
        title: 'Dập tắt mọi loại đám cháy',
        bg: 'bg-red-100',
        border: 'border-red-600',
        iconColor: 'text-red-700',
      },
      {
        icon: '✅',
        title: 'Kiểm định bởi Cục PCCC',
        bg: 'bg-green-100',
        border: 'border-green-600',
        iconColor: 'text-green-700',
      },
      {
        icon: '🏭',
        title: 'Sản xuất bởi 83MEC – Bộ Quốc Phòng',
        bg: 'bg-blue-100',
        border: 'border-blue-700',
        iconColor: 'text-blue-800',
      },
    ],
  },
];

const products = [
  // tru cuu hoa
  {
    slug: 'tru-cuu-hoa-3-cua',
    title: 'Trụ nước chữa cháy 3 cửa',
    categorySlug: 'tru-cuu-hoa-BQP',
    image: 'https://hevtech.vn/uploads/Tru-cuu-hoa-3-cua.jpg',
    video_id: null,
    is_hot: true, // 🔥 Featured sản phẩm
    specs: [
      'Tiêu chuẩn: TCVN 5715:1993',
      'Vật liệu: Gang xám GX 15-32',
      'Áp lực làm việc: 1.6 MPa',
      'Số cửa: 3 (1×DN100 + 2×DN65)',
      'Trọng lượng: 68kg',
      'Màu sơn: Đỏ',
    ],
    detail: {
      code: 'TCH-3C',
      points: [
        'Thân van gang đúc nguyên khối',
        'Áp lực thử nghiệm 2.4 MPa',
        'Chịu nhiệt -10°C đến +60°C',
        'Kết nối mặt bích DN100 PN16',
      ],
      description_text: [
        'Trụ cứu hỏa 3 cửa sản xuất theo tiêu chuẩn TCVN 5715:1993.',
        'Phù hợp lắp đặt tại căn cứ quân sự, khu công nghiệp, doanh trại.',
      ],
    },
  },
  {
    slug: 'tru-cuu-hoa-2-cua',
    title: 'Trụ nước chữa cháy 2 cửa',
    categorySlug: 'tru-cuu-hoa-BQP',
    image: 'https://hevtech.vn/uploads/Tru-cuu-hoa-2-cua.jpg',
    video_id: null,
    is_hot: false,
    specs: [
      'Tiêu chuẩn: TCVN 5715:1993',
      'Vật liệu: Gang xám',
      'Áp lực làm việc: 1.6 MPa',
      'Số cửa: 2 (2×DN65)',
      'Trọng lượng: 52kg',
      'Màu sơn: Đỏ',
    ],
    detail: {
      code: 'TCH-2C',
      points: ['Thiết kế gọn hơn trụ 3 cửa', 'Phù hợp khu vực hẹp', 'Gang đúc chống gỉ'],
      description_text: ['Trụ cứu hỏa 2 cửa phù hợp cho khu vực có không gian lắp đặt hạn chế.'],
    },
  },
  // thiet bi pccc
  {
    slug: 'hong-tiep-nuoc-2-cua',
    title: 'Họng tiếp nước 2 cửa',
    categorySlug: 'thiet-bi-pccc-bqp',
    image: 'https://hevtech.vn/uploads/Hong-tiep-nuoc-2-cua-.jpg',
    video_id: null,
    is_hot: false,
    specs: ['Tiêu chuẩn: TCVN', 'Vật liệu: Gang', 'Số cửa: 2×DN65', 'Áp lực: PN10', 'Màu: Đỏ'],
    detail: {
      code: 'HTN-2C',
      points: ['Kết nối xe chữa cháy', 'Khóa tay quay nhôm hợp kim', 'Nắp bảo vệ chống bụi'],
      description_text: ['Họng tiếp nước 2 cửa dùng để tiếp nước từ xe chữa cháy vào hệ thống.'],
    },
  },
  {
    slug: 'hong-tiep-nuoc-4-cua',
    title: 'Họng tiếp nước 4 cửa',
    categorySlug: 'thiet-bi-pccc-bqp',
    image: 'https://hevtech.vn/uploads/Hong-tiep-nuoc-4-cua-1.jpg',
    video_id: null,
    is_hot: true, // 🔥 Featured sản phẩm
    specs: ['Tiêu chuẩn: TCVN', 'Vật liệu: Gang', 'Số cửa: 4×DN65', 'Áp lực: PN10', 'Màu: Đỏ'],
    detail: {
      code: 'HTN-4C',
      points: ['4 cửa tiếp nước đồng thời', 'Lưu lượng cao', 'Phù hợp công trình lớn'],
      description_text: [
        'Họng tiếp nước 4 cửa dùng cho các công trình yêu cầu lưu lượng nước lớn.',
      ],
    },
  },
  {
    slug: 'van-goc-chua-chay-d50-d65',
    title: 'Van góc chữa cháy D50-D65',
    categorySlug: 'thiet-bi-pccc-bqp',
    image: 'https://hevtech.vn/uploads/Van-goc-chua-chay-D50-D65.jpg',
    video_id: 'VJLGIXcIKG0',
    is_hot: true, // 🔥 Featured sản phẩm
    specs: [
      'Tiêu chuẩn: TCVN 5739:2023',
      'Chất liệu: Gang',
      'Màu: Đỏ - Vàng',
      'Đường kính: 43mm (D50), 57mm (D65)',
      'Áp suất: PN10',
      'Kích thước: 155x135x92mm / 193x155x102mm',
      'Xuất xứ: Việt Nam',
    ],
    detail: {
      code: 'DN50.00 và DN65.00',
      points: [
        'Thân van gang đúc nguyên khối',
        'Tay quay nhôm hợp kim chống gỉ',
        'Trục van thép mạ kẽm',
        'Sản xuất bởi 83MEC / Bộ Quốc Phòng',
      ],
      description_text: [
        'Van góc chữa cháy kết nối trực tiếp với vòi, kiểm soát tốc độ và lưu lượng nước.',
        'Đạt tiêu chuẩn TCVN 5739:2023.',
      ],
    },
  },
  {
    slug: 'cuon-voi-chua-chay-cv50-cv65',
    title: 'Cuộn vòi chữa cháy CV50-CV65',
    categorySlug: 'thiet-bi-pccc-bqp',
    image: 'https://hevtech.vn/uploads/cuon-voi-chua-chay-Cv50-CV65-1.jpg',
    video_id: null,
    is_hot: false,
    specs: [
      'Chiều dài: 20m / 25m / 30m',
      'Đường kính: DN50 / DN65',
      'Vật liệu: Cao su tổng hợp + vải bố',
      'Áp lực: PN10',
      'Tiêu chuẩn: TCVN 5740',
    ],
    detail: {
      code: 'CV50 / CV65',
      points: ['Vỏ ngoài cao su chịu mài mòn', 'Cốt vải bố chịu lực cao', 'Khớp nối nhôm hợp kim'],
      description_text: ['Cuộn vòi chữa cháy tiêu chuẩn BQP, phù hợp cho hầu hết hệ thống PCCC.'],
    },
  },
  {
    slug: 'lang-phun-chua-chay-lp65a-lp50b',
    title: 'Lăng phun chữa cháy LP65A-LP50B',
    categorySlug: 'thiet-bi-pccc-bqp',
    image: 'https://hevtech.vn/uploads/Lang-phun-chua-chay-lp65A-lp50B-1.jpg',
    video_id: null,
    is_hot: false,
    specs: [
      'Loại: LP65A và LP50B',
      'Vật liệu: Nhôm hợp kim',
      'Lưu lượng: 200-400 L/phút',
      'Áp lực: PN10',
      'Tiêu chuẩn: TCVN 5740',
    ],
    detail: {
      code: 'LP65A / LP50B',
      points: ['Phun mưa và phun đặc', 'Tay cầm chống trượt', 'Khớp nối nhanh'],
      description_text: [
        'Lăng phun chữa cháy điều chỉnh được góc phun, phù hợp nhiều tình huống chữa cháy.',
      ],
    },
  },
  // binh chua chay
  {
    slug: 'binh-chua-chay-bot-abc-4kg',
    title: 'Bình chữa cháy bột ABC 4kg',
    categorySlug: 'binh-chua-chay-BQP',
    image: 'https://hevtech.vn/uploads/Binh-chua-chay-bot-4kg-ABC.jpg',
    video_id: null,
    is_hot: true, // 🔥 Featured sản phẩm
    specs: [
      'Khối lượng bột: 4kg',
      'Chất chữa cháy: Bột ABC',
      'Áp suất nạp: 15 bar',
      'Thời gian phun: 12-15s',
      'Tầm phun xa: 3-4m',
      'Tiêu chuẩn: TCVN 7026',
    ],
    detail: {
      code: 'MFZ/ABC4',
      points: [
        'Dập tắt đám cháy nhóm A, B, C',
        'Van khóa an toàn',
        'Vòi phun linh hoạt',
        'Kiểm định định kỳ 5 năm',
      ],
      description_text: ['Bình bột ABC 4kg phù hợp văn phòng, gia đình, xe hơi.'],
    },
  },
  {
    slug: 'binh-chua-chay-bot-abc-8kg',
    title: 'Bình chữa cháy bột ABC 8kg',
    categorySlug: 'binh-chua-chay-BQP',
    image: 'https://hevtech.vn/uploads/Binh-chua-chay-bot-8kg-ABC.jpg',
    video_id: null,
    is_hot: false,
    specs: [
      'Khối lượng bột: 8kg',
      'Chất chữa cháy: Bột ABC',
      'Áp suất nạp: 15 bar',
      'Thời gian phun: 20-25s',
      'Tầm phun xa: 4-5m',
      'Tiêu chuẩn: TCVN 7026',
    ],
    detail: {
      code: 'MFZ/ABC8',
      points: [
        'Dập tắt đám cháy nhóm A, B, C',
        'Phù hợp kho xưởng, nhà máy',
        'Bình thép sơn đỏ chịu lực',
      ],
      description_text: ['Bình bột ABC 8kg phù hợp cho kho xưởng, nhà hàng, siêu thị.'],
    },
  },
  {
    slug: 'binh-chua-chay-co2-mt3',
    title: 'Bình chữa cháy CO2 MT3',
    categorySlug: 'binh-chua-chay-BQP',
    image: 'https://hevtech.vn/uploads/Binh-chua-chay-CO2-MT3.jpg',
    video_id: null,
    is_hot: false,
    specs: [
      'Khối lượng CO2: 3kg',
      'Áp suất nạp: 60 bar',
      'Thời gian phun: 8-10s',
      'Tầm phun xa: 1.5-2m',
      'Tiêu chuẩn: TCVN 7026',
    ],
    detail: {
      code: 'MT3',
      points: [
        'Không để lại tồn dư sau chữa cháy',
        'Phù hợp phòng máy chủ, thiết bị điện',
        'Đầu loa phun CO2',
      ],
      description_text: ['Bình CO2 MT3 lý tưởng cho đám cháy thiết bị điện, phòng server.'],
    },
  },
];

// ─── MAIN ────────────────────────────────────────────────────

export async function seedProducts(prisma: PrismaClient) {
  console.log('Cleaning products...');

  await prisma.productDetail.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log('Seeding categories...');

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        slug: cat.slug,
        name: cat.name,
        subtitle: cat.subtitle,
        banner_image: cat.banner_image,
        description_image: cat.description_image,
        description_text: cat.description_text,
        features: cat.features,
      },
    });
  }

  console.log('Seeding products...');

  for (const p of products) {
    const category = await prisma.category.findUnique({
      where: { slug: p.categorySlug },
    });
    if (!category) {
      console.warn(`Category not found: ${p.categorySlug}`);
      continue;
    }

    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        image: p.image,
        link: `/product/${p.categorySlug}/${p.slug}`,
        description_image: p.image,
        video_id: p.video_id,
        specs: p.specs,
        is_hot: p.is_hot, // 🔥 THÊM ĐÂY
        category_id: category.id,
      },
    });

    await prisma.productDetail.upsert({
      where: { product_id: product.id },
      update: {},
      create: {
        product_id: product.id,
        code: p.detail.code,
        points: p.detail.points,
        description_text: p.detail.description_text,
      },
    });
  }

  console.log(`Done! ${categories.length} categories, ${products.length} products`);
}

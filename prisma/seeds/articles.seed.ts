import { PrismaClient } from "@prisma/client";

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
  type: "paragraph";

  data: { text: string };
}

interface HeadingBlock {
  type: "heading";

  data: { level: 2 | 3; text: string; anchor: string };
}

interface ImageBlock {
  type: "image";

  data: { src: string; caption?: string; alt: string };
}

interface ImageGalleryBlock {
  type: "image_gallery";

  data: {
    images: { src: string; caption?: string; alt: string }[];
  };
}

interface VideoBlock {
  type: "video";

  data: { url: string; caption?: string };
}

interface TableOfContentsBlock {
  type: "table_of_contents";

  data: {
    items: { label: string; anchor: string }[];
  };
}

interface TableBlock {
  type: "table";

  data: {
    caption?: string;

    columns: string[];

    rows: string[][];
  };
}
interface ListBlock {
  type: "list";

  data: {
    style: "ordered" | "unordered";

    items: string[];
  };
}

interface CalloutBlock {
  type: "callout";

  data: {
    variant: "info" | "success" | "warning";

    title?: string;

    text: string;
  };
}
interface DividerBlock {
  type: "divider";

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
}

// ─────────────────────────────────────────────────────────────

// BÀI 1: Chương trình Tết Sum Vầy

// ─────────────────────────────────────────────────────────────

const article1: Article = {
  id: 1,

  slug: "chuong-trinh-tet-sum-vay-xuan-on-dang-tai-83mec",

  title:
    'Nhà Máy Z183: Chương Trình "Tết Sum Vầy – Xuân Ơn Đảng" Gắn Kết Tinh Thần Đoàn Kết, Sẻ Chia',

  excerpt:
    "Nhà máy Z183 tổ chức chương trình Tết Sum Vầy – Xuân Ơn Đảng nhằm tri ân cán bộ, công nhân viên, thắt chặt tinh thần đoàn kết trước thềm năm mới.",

  thumbnail: "https://hevtech.vn/uploads/images/articles/1.jpg",

  category: "Tin tức",

  tags: ["sự kiện", "tết 2025", "đoàn kết", "Z183"],

  author: "Ban Biên Tập 83MEC",

  published_at: "2025-01-18",

  content: [
    {
      type: "table_of_contents",

      data: {
        items: [
          { label: "Ý nghĩa chương trình", anchor: "y-nghia" },

          { label: "Các hoạt động nổi bật", anchor: "hoat-dong" },

          { label: "Hình ảnh sự kiện", anchor: "hinh-anh" },

          { label: "Phát biểu lãnh đạo", anchor: "phat-bieu" },
        ],
      },
    },

    {
      type: "paragraph",

      data: {
        text: 'Trong không khí rộn ràng đón chào xuân Ất Tỵ 2025, Nhà máy Z183 – đơn vị trực thuộc Bộ Quốc Phòng – đã long trọng tổ chức chương trình "Tết Sum Vầy – Xuân Ơn Đảng" dành cho toàn thể cán bộ, chiến sĩ và công nhân viên. Đây là hoạt động thường niên mang ý nghĩa sâu sắc, thể hiện sự quan tâm của Đảng ủy và Ban Giám đốc nhà máy đối với đời sống tinh thần của người lao động.',
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Ý Nghĩa Chương Trình", anchor: "y-nghia" },
    },

    {
      type: "paragraph",

      data: {
        text: "Chương trình không chỉ là dịp để mọi người cùng nhau vui Tết, mà còn là cơ hội để lãnh đạo nhà máy tri ân những đóng góp không mệt mỏi của từng cán bộ, công nhân trong suốt một năm qua. Tinh thần đoàn kết, chia sẻ và gắn bó chính là nền tảng để Z183 vươn lên hoàn thành xuất sắc mọi nhiệm vụ được giao.",
      },
    },

    {
      type: "callout",

      data: {
        variant: "success",

        title: "Thành tích năm 2024",

        text: "Nhà máy Z183 hoàn thành 118% kế hoạch sản xuất năm 2024, được Bộ Quốc Phòng tặng Bằng khen xuất sắc.",
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Các Hoạt Động Nổi Bật", anchor: "hoat-dong" },
    },

    {
      type: "list",

      data: {
        style: "unordered",

        items: [
          "Trao tặng quà Tết cho 100% cán bộ, công nhân viên và gia đình chính sách",

          "Chương trình văn nghệ chào xuân do chính công nhân viên biểu diễn",

          "Hội thi gói bánh chưng truyền thống, tạo không khí Tết ấm áp",

          "Bốc thăm may mắn với nhiều phần quà có giá trị",

          "Bữa tiệc tất niên đầm ấm, gắn kết toàn thể nhà máy",
        ],
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Hình Ảnh Sự Kiện", anchor: "hinh-anh" },
    },

    {
      type: "image_gallery",

      data: {
        images: [
          {
            src: "https://hevtech.vn/uploads/images/articles/1.jpg",

            caption: "Toàn cảnh buổi lễ Tết Sum Vầy tại hội trường lớn",

            alt: "Lễ Tết Sum Vầy Z183",
          },

          {
            src: "https://hevtech.vn/uploads/images/articles/2.jpg",

            caption: "Ban Giám đốc trao quà cho cán bộ công nhân viên",

            alt: "Trao quà Tết Z183",
          },

          {
            src: "https://hevtech.vn/uploads/images/articles/3.jpg",

            caption: "Hội thi gói bánh chưng truyền thống",

            alt: "Gói bánh chưng Z183",
          },

          {
            src: "https://hevtech.vn/uploads/images/articles/4.jpg",

            caption: "Chương trình văn nghệ chào xuân Ất Tỵ 2025",

            alt: "Văn nghệ chào xuân Z183",
          },
        ],
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Phát Biểu Lãnh Đạo", anchor: "phat-bieu" },
    },

    {
      type: "callout",

      data: {
        variant: "info",

        title: "Giám đốc Nhà máy Z183 phát biểu",

        text: '"Chương trình Tết Sum Vầy là minh chứng cho tinh thần đại gia đình Z183 – nơi mỗi cán bộ, công nhân đều được trân trọng và yêu thương. Chúng ta cùng nhau bước vào năm mới với khí thế mạnh mẽ, quyết tâm hoàn thành và hoàn thành vượt mức mọi chỉ tiêu kế hoạch."',
      },
    },

    {
      type: "paragraph",

      data: {
        text: "Chương trình khép lại trong không khí ấm áp và đầy xúc động, để lại những kỷ niệm đẹp trong lòng mỗi cán bộ, công nhân viên. Xuân Ất Tỵ 2025 – một mùa xuân mới với những hy vọng và khát vọng mới của tập thể Z183.",
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────

// BÀI 2: Hộp Đồ Nghề Đa Năng Kiểu Quân Dụng

// ─────────────────────────────────────────────────────────────

const article2: Article = {
  id: 2,

  slug: "hop-do-nghe-da-nang-kieu-quan-dung-83mec-viet-nam",

  title:
    "Thùng Đồ Nghề Đa Năng Kiểu Quân Dụng 83MEC Việt Nam – Giải Pháp Xuất Khẩu B2B Hàng Đầu",

  excerpt:
    "Thùng đồ nghề quân dụng 83MEC – sản phẩm đạt tiêu chuẩn xuất khẩu B2B, độ bền cao, chống va đập, chống nước, đang được thị trường quốc tế ưa chuộng.",

  thumbnail: "https://hevtech.vn/uploads/images/articles/5.jpg",

  category: "Sản phẩm",

  tags: ["hộp đồ nghề", "quân dụng", "xuất khẩu", "B2B", "83MEC"],

  author: "Ban Biên Tập 83MEC",

  published_at: "2025-08-05",

  content: [
    {
      type: "table_of_contents",

      data: {
        items: [
          { label: "Độ bền & chống nước", anchor: "do-ben" },

          { label: "Hoạt động xuất khẩu", anchor: "xuat-khau" },

          { label: "Thông số kỹ thuật", anchor: "thong-so" },

          { label: "Hình ảnh sản phẩm", anchor: "hinh-anh-sp" },

          { label: "Quy trình đặt hàng B2B", anchor: "dat-hang" },
        ],
      },
    },

    {
      type: "paragraph",

      data: {
        text: "Thùng đồ nghề đa năng kiểu quân dụng của 83MEC Việt Nam đang trở thành lựa chọn hàng đầu cho các đối tác B2B quốc tế. Được sản xuất theo tiêu chuẩn quân sự nghiêm ngặt, sản phẩm đáp ứng yêu cầu khắt khe nhất về độ bền, tính năng bảo vệ và thẩm mỹ công nghiệp.",
      },
    },

    {
      type: "heading",

      data: {
        level: 2,
        text: "Độ Bền Cao, Chống Va Đập, Chống Nước, Kín Khí",
        anchor: "do-ben",
      },
    },

    {
      type: "paragraph",

      data: {
        text: "Vỏ hộp được dập từ thép tấm cán nguội dày 1.2mm, qua xử lý bề mặt sơn tĩnh điện chống gỉ. Khóa khí silicon kín 360° đảm bảo chống nước cấp IP65, phù hợp sử dụng trong mọi điều kiện thời tiết khắc nghiệt. Góc hộp được gia cố bằng viền thép dập để chịu va đập mạnh.",
      },
    },

    {
      type: "image",

      data: {
        src: "https://hevtech.vn/uploads/images/articles/6.jpg",

        caption: "Chi tiết cấu tạo khóa khí silicon kín 360° chống nước IP65",

        alt: "Hộp đồ nghề chống nước 83MEC",
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Hoạt Động Xuất Khẩu B2B", anchor: "xuat-khau" },
    },

    {
      type: "paragraph",

      data: {
        text: "83MEC hiện là đối tác cung ứng hộp quân dụng cho các doanh nghiệp tại Mỹ, EU, Úc và Đông Nam Á. Năng lực sản xuất đạt 50.000 sản phẩm/tháng với quy trình kiểm soát chất lượng ISO 9001:2015. Thời gian giao hàng tiêu chuẩn từ 30–45 ngày tùy số lượng đơn hàng.",
      },
    },

    {
      type: "callout",

      data: {
        variant: "info",

        title: "MOQ & Lead Time",

        text: "Đơn hàng tối thiểu (MOQ): 500 chiếc/lần. Thời gian sản xuất: 30–45 ngày. Hỗ trợ OEM/ODM theo yêu cầu khách hàng.",
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Thông Số Kỹ Thuật", anchor: "thong-so" },
    },

    {
      type: "table",

      data: {
        caption: "Thông số kỹ thuật thùng đồ nghề quân dụng 83MEC",

        columns: ["Thông số", "Model S", "Model M", "Model L"],

        rows: [
          [
            "Kích thước ngoài (mm)",
            "300×200×150",
            "400×300×200",
            "500×400×250",
          ],

          [
            "Kích thước trong (mm)",
            "280×185×140",
            "378×285×190",
            "478×385×240",
          ],

          [
            "Vật liệu vỏ",
            "Thép cán nguội 1.2mm",
            "Thép cán nguội 1.2mm",
            "Thép cán nguội 1.5mm",
          ],

          ["Trọng lượng (kg)", "1.8", "2.9", "4.5"],

          ["Tải trọng tối đa (kg)", "20", "35", "50"],

          ["Chống nước", "IP65", "IP65", "IP67"],

          [
            "Màu sơn tiêu chuẩn",
            "OD Green / Black",
            "OD Green / Black",
            "OD Green / Black / Tan",
          ],

          [
            "Chứng nhận",
            "TCVN / ISO 9001",
            "TCVN / ISO 9001",
            "TCVN / ISO 9001 / MIL-SPEC",
          ],
        ],
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Hình Ảnh Sản Phẩm", anchor: "hinh-anh-sp" },
    },

    {
      type: "image_gallery",

      data: {
        images: [
          {
            src: "https://hevtech.vn/uploads/images/articles/7.jpg",

            caption: "Model S – Thùng đồ nghề cỡ nhỏ, dễ mang theo",

            alt: "Hộp quân dụng Model S",
          },

          {
            src: "https://hevtech.vn/uploads/images/articles/8.jpg",

            caption: "Model M – Phiên bản tiêu chuẩn xuất khẩu phổ biến nhất",

            alt: "Hộp quân dụng Model M",
          },

          {
            src: "https://hevtech.vn/uploads/images/articles/9.jpg",

            caption: "Model L – Thùng lớn đạt chuẩn MIL-SPEC",

            alt: "Hộp quân dụng Model L",
          },

          {
            src: "https://hevtech.vn/uploads/images/articles/10.jpg",

            caption: "Nội thất xốp EVA tùy chỉnh theo yêu cầu",

            alt: "Nội thất hộp quân dụng",
          },
        ],
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Quy Trình Đặt Hàng B2B", anchor: "dat-hang" },
    },

    {
      type: "list",

      data: {
        style: "ordered",

        items: [
          "Gửi yêu cầu báo giá qua email: info@83mec.com hoặc Zalo/WhatsApp: (+84) 2163.825.772",

          "83MEC phản hồi báo giá chi tiết trong vòng 24 giờ làm việc",

          "Xác nhận mẫu và tiêu chuẩn kỹ thuật – có thể yêu cầu sample miễn phí",

          "Ký hợp đồng và thanh toán cọc 30% để bắt đầu sản xuất",

          "Kiểm tra chất lượng (QC) trước khi đóng gói và xuất hàng",

          "Giao hàng bằng container FCL/LCL hoặc air freight theo yêu cầu",
        ],
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────

// BÀI 3: Trụ Chữa Cháy 3 Cửa Bộ Quốc Phòng

// ─────────────────────────────────────────────────────────────

const article3: Article = {
  id: 3,

  slug: "tru-chua-chay-3-cua-bo-quoc-phong",

  title:
    "Trụ Chữa Cháy 3 Cửa Bộ Quốc Phòng – Tiêu Chuẩn TCVN, Sản Xuất Tại Z183",

  excerpt:
    "Trụ cứu hỏa 3 cửa Bộ Quốc Phòng do 83MEC sản xuất – đạt tiêu chuẩn TCVN 5715, vật liệu gang đúc chất lượng cao, áp lực làm việc 1.6MPa.",

  thumbnail: "https://hevtech.vn/uploads/images/articles/11.jpg",

  category: "Sản phẩm",

  tags: ["PCCC", "trụ cứu hỏa", "Bộ Quốc Phòng", "TCVN", "Z183"],

  author: "Ban Biên Tập 83MEC",

  published_at: "2023-06-10",

  content: [
    {
      type: "table_of_contents",

      data: {
        items: [
          { label: "Giới thiệu sản phẩm", anchor: "gioi-thieu" },

          { label: "Thông số kỹ thuật", anchor: "thong-so-ky-thuat" },

          { label: "Tiêu chuẩn áp dụng", anchor: "tieu-chuan" },

          { label: "Hình ảnh sản phẩm", anchor: "hinh-anh-sp3" },

          { label: "Ứng dụng thực tế", anchor: "ung-dung" },

          { label: "Liên hệ đặt hàng", anchor: "lien-he" },
        ],
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Giới Thiệu Sản Phẩm", anchor: "gioi-thieu" },
    },

    {
      type: "paragraph",

      data: {
        text: "Trụ cứu hỏa 3 cửa (hay còn gọi là Trụ chữa cháy 3 cửa) là thiết bị PCCC quan trọng thuộc danh mục sản phẩm quân dụng do Nhà máy Z183 – 83MEC sản xuất theo đặt hàng của Bộ Quốc Phòng. Sản phẩm đáp ứng đầy đủ các yêu cầu kỹ thuật theo tiêu chuẩn TCVN 5715:1993 và các quy định hiện hành về thiết bị phòng cháy chữa cháy.",
      },
    },

    {
      type: "image",

      data: {
        src: "https://hevtech.vn/uploads/images/articles/11.jpg",

        caption: "Trụ cứu hỏa 3 cửa Bộ Quốc Phòng – sản xuất tại Nhà máy Z183",

        alt: "Trụ cứu hỏa 3 cửa BQP 83MEC",
      },
    },

    {
      type: "heading",

      data: {
        level: 2,
        text: "Thông Số Kỹ Thuật",
        anchor: "thong-so-ky-thuat",
      },
    },

    {
      type: "table",

      data: {
        caption: "Thông số kỹ thuật trụ cứu hỏa 3 cửa Bộ Quốc Phòng",

        columns: ["Thông số", "Giá trị"],

        rows: [
          ["Loại sản phẩm", "Trụ cứu hỏa kiểu ướt (wet barrel)"],

          ["Số cửa xuất nước", "3 cửa (1 × DN100 + 2 × DN65)"],

          ["Vật liệu thân", "Gang xám GX 15-32 (Gray Cast Iron)"],

          ["Áp lực làm việc", "1.6 MPa (16 bar)"],

          ["Áp lực thử nghiệm", "2.4 MPa (24 bar)"],

          ["Nhiệt độ môi trường", "-10°C đến +60°C"],

          ["Kết nối đầu vào", "Mặt bích DN100, PN16"],

          ["Chiều cao lắp đặt", "800mm – 1000mm (tính từ mặt đất)"],

          ["Màu sơn", "Đỏ theo TCVN / theo yêu cầu BQP"],

          ["Trọng lượng", "Khoảng 68kg"],

          ["Tiêu chuẩn", "TCVN 5715:1993"],
        ],
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Tiêu Chuẩn Áp Dụng", anchor: "tieu-chuan" },
    },

    {
      type: "list",

      data: {
        style: "unordered",

        items: [
          "TCVN 5715:1993 – Họng nước chữa cháy ngoài nhà",

          "TCVN 7435:2004 – Phòng cháy chữa cháy – Từ ngữ và định nghĩa",

          "QCVN 06:2022/BXD – Quy chuẩn kỹ thuật quốc gia về an toàn cháy",

          "Tiêu chuẩn kỹ thuật quân sự do Bộ Quốc Phòng ban hành",
        ],
      },
    },

    {
      type: "callout",

      data: {
        variant: "warning",

        title: "Lưu ý lắp đặt",

        text: "Trụ phải được lắp đặt bởi đơn vị thi công có chứng chỉ PCCC. Sau lắp đặt cần thử áp 1.5 lần áp suất làm việc trong 30 phút trước khi đưa vào vận hành.",
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Hình Ảnh Sản Phẩm", anchor: "hinh-anh-sp3" },
    },

    {
      type: "image_gallery",

      data: {
        images: [
          {
            src: "https://hevtech.vn/uploads/images/articles/12.jpg",

            caption: "Góc nhìn tổng thể trụ cứu hỏa 3 cửa",

            alt: "Trụ cứu hỏa 3 cửa góc 1",
          },

          {
            src: "https://hevtech.vn/uploads/images/articles/13.jpg",

            caption: "Chi tiết van xuất nước DN65 và nắp bảo vệ",

            alt: "Van xuất nước DN65",
          },

          {
            src: "https://hevtech.vn/uploads/images/articles/14.jpg",

            caption: "Thi công lắp đặt tại dự án quân sự",

            alt: "Lắp đặt trụ cứu hỏa",
          },
        ],
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Ứng Dụng Thực Tế", anchor: "ung-dung" },
    },

    {
      type: "paragraph",

      data: {
        text: "Trụ cứu hỏa 3 cửa Bộ Quốc Phòng được lắp đặt tại các căn cứ quân sự, kho tàng, doanh trại, nhà máy quốc phòng và các công trình hạ tầng trọng điểm trên toàn quốc. Sản phẩm cũng được cung cấp cho các khu công nghiệp, khu đô thị và công trình dân sự theo nhu cầu.",
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Liên Hệ Đặt Hàng", anchor: "lien-he" },
    },

    {
      type: "callout",

      data: {
        variant: "info",

        title: "Thông tin liên hệ 83MEC",

        text: "📍 Nhà máy Z183 – Lào Cai, Việt Nam\n📧 info@83mec.com\n📞 (+84) 2163.825.772\nThời gian làm việc: Thứ 2 – Thứ 6, 7:30 – 16:30",
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────

// BÀI 4: Hộp Sắt Quân Dụng Chuẩn NATO

// ─────────────────────────────────────────────────────────────

const article4: Article = {
  id: 4,

  slug: "hop-sat-quan-dung-chuan-nato",

  title:
    "Hộp Sắt Quân Dụng Chuẩn NATO – 83MEC Việt Nam Đủ Năng Lực Cung Ứng Xuất Khẩu",

  excerpt:
    "83MEC Việt Nam sản xuất hộp sắt quân dụng đạt chuẩn NATO STANAG, vật liệu thép CRS, sơn bột epoxy chịu môi trường, phục vụ xuất khẩu sang các thị trường NATO.",

  thumbnail: "https://hevtech.vn/uploads/images/articles/15.jpg",

  category: "Sản phẩm",

  tags: ["hộp sắt", "NATO", "STANAG", "xuất khẩu", "quân dụng", "83MEC"],

  author: "Ban Biên Tập 83MEC",

  published_at: "2024-03-20",

  content: [
    {
      type: "table_of_contents",

      data: {
        items: [
          { label: "Tiêu chuẩn NATO STANAG", anchor: "tieu-chuan-nato" },

          { label: "Năng lực sản xuất", anchor: "nang-luc" },

          { label: "So sánh các dòng sản phẩm", anchor: "so-sanh" },

          { label: "Video quy trình sản xuất", anchor: "video-sx" },

          { label: "Hình ảnh sản phẩm", anchor: "hinh-anh-sp4" },

          { label: "Thị trường xuất khẩu", anchor: "thi-truong" },
        ],
      },
    },

    {
      type: "paragraph",

      data: {
        text: "Hộp sắt quân dụng chuẩn NATO (NATO-standard ammo cans / military cans) là dòng sản phẩm chiến lược của 83MEC hướng đến thị trường xuất khẩu quốc phòng toàn cầu. Với hơn 30 năm kinh nghiệm sản xuất cơ khí quân sự, Nhà máy Z183 đủ năng lực đáp ứng các yêu cầu khắt khe nhất của tiêu chuẩn NATO STANAG 4110.",
      },
    },

    {
      type: "heading",

      data: {
        level: 2,
        text: "Tiêu Chuẩn NATO STANAG",
        anchor: "tieu-chuan-nato",
      },
    },

    {
      type: "paragraph",

      data: {
        text: "STANAG (Standardization Agreement) 4110 quy định các yêu cầu về hộp đạn và container vận chuyển quân dụng của các nước thành viên NATO. Để đạt chứng nhận này, sản phẩm phải vượt qua hàng loạt bài kiểm tra khắt khe: drop test từ độ cao 1.2m, stack test chịu tải 4 lớp, water immersion test 30 phút ở độ sâu 1m và temperature cycle test từ -51°C đến +71°C.",
      },
    },

    {
      type: "callout",

      data: {
        variant: "success",

        title: "Chứng nhận đạt được",

        text: "83MEC đã hoàn thành kiểm định mẫu tại Viện Kỹ thuật Quân sự (IET) và đang trong quá trình xin cấp chứng nhận NATO STANAG 4110 cho các dòng hộp M2A1 và PA108 clone.",
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Năng Lực Sản Xuất", anchor: "nang-luc" },
    },

    {
      type: "list",

      data: {
        style: "unordered",

        items: [
          "Dây chuyền dập tấm CNC công suất 80 tấn và 200 tấn",

          "Hệ thống sơn tĩnh điện epoxy powder coating theo tiêu chuẩn MIL-DTL-12468",

          "Xưởng lắp ráp và kiểm tra chất lượng theo ISO 9001:2015",

          "Phòng thử nghiệm áp lực, kiểm tra độ kín và thử va đập nội bộ",

          "Năng lực sản xuất: 80.000 – 120.000 sản phẩm/tháng tùy model",
        ],
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "So Sánh Các Dòng Sản Phẩm", anchor: "so-sanh" },
    },

    {
      type: "table",

      data: {
        caption: "So sánh các dòng hộp sắt quân dụng chuẩn NATO của 83MEC",

        columns: ["Tính năng", "M2A1 Clone", "PA108 Clone", "Custom OEM"],

        rows: [
          ["Kích thước (mm)", "295×142×172", "270×148×125", "Theo yêu cầu"],

          ["Vật liệu", "CRS 0.9mm", "CRS 0.9mm", "CRS / Alloy Steel"],

          ["Sơn bề mặt", "OD Green Epoxy", "OD Green Epoxy", "Tùy chọn"],

          ["Khóa", "Wire bail handle + latch", "Swivel latch", "Theo yêu cầu"],

          ["Gioăng kín khí", "Neoprene", "Neoprene", "EPDM / Silicone"],

          ["Chịu nước", "IP65", "IP65", "IP65 – IP68"],

          ["Tiêu chuẩn", "STANAG 4110", "STANAG 4110", "Theo yêu cầu"],

          ["MOQ (chiếc)", "1,000", "1,000", "500"],

          ["Lead time", "45 ngày", "45 ngày", "60–90 ngày"],
        ],
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Video Quy Trình Sản Xuất", anchor: "video-sx" },
    },

    {
      type: "video",

      data: {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",

        caption:
          "Quy trình sản xuất hộp sắt quân dụng chuẩn NATO tại Nhà máy Z183 – 83MEC",
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Hình Ảnh Sản Phẩm", anchor: "hinh-anh-sp4" },
    },

    {
      type: "image_gallery",

      data: {
        images: [
          {
            src: "https://hevtech.vn/uploads/images/articles/15.jpg",

            caption: "Hộp M2A1 Clone – màu OD Green chuẩn NATO",

            alt: "Hộp NATO M2A1 83MEC",
          },

          {
            src: "https://hevtech.vn/uploads/images/articles/16.jpg",

            caption: "Hộp PA108 Clone – thiết kế compact",

            alt: "Hộp NATO PA108 83MEC",
          },

          {
            src: "https://hevtech.vn/uploads/images/articles/17.jpg",

            caption: "Chi tiết khóa wire bail handle và gioăng Neoprene",

            alt: "Khóa hộp NATO",
          },

          {
            src: "https://hevtech.vn/uploads/images/articles/18.jpg",

            caption: "Đóng gói xuất khẩu container FCL sang thị trường EU",

            alt: "Xuất khẩu hộp NATO container",
          },
        ],
      },
    },

    {
      type: "heading",

      data: { level: 2, text: "Thị Trường Xuất Khẩu", anchor: "thi-truong" },
    },

    {
      type: "paragraph",

      data: {
        text: "Hiện tại 83MEC đang cung ứng hộp sắt quân dụng cho các đối tác tại Hoa Kỳ, Đức, Pháp, Úc, Ba Lan và các nước Đông Nam Á. Với lợi thế chi phí sản xuất cạnh tranh, chất lượng đạt chuẩn quốc tế và thời gian giao hàng ổn định, 83MEC đang ngày càng khẳng định vị thế là nhà cung ứng đáng tin cậy trong chuỗi cung ứng quốc phòng toàn cầu.",
      },
    },

    {
      type: "callout",

      data: {
        variant: "info",

        title: "Yêu cầu báo giá xuất khẩu",

        text: "Gửi RFQ (Request for Quotation) qua email: export@83mec.com\nHoặc điền form tại: 83mec.com/lien-he\nChúng tôi phản hồi trong vòng 24h làm việc.",
      },
    },
  ],
};

const fakeArticles: Article[] = [
  {
    id: 5,
    slug: "san-pham-co-khi-chinh-xac-z183",
    title:
      "Sản Phẩm Cơ Khí Chính Xác Z183 – Độ Chính Xác Cao, Đáp Ứng Tiêu Chuẩn Quốc Tế",
    excerpt:
      "Z183 cung cấp các sản phẩm cơ khí chính xác đạt tiêu chuẩn quốc tế, phục vụ công nghiệp quốc phòng và dân sự.",
    thumbnail: "https://hevtech.vn/uploads/images/articles/19.jpg",
    category: "Sản phẩm",
    tags: ["cơ khí", "chính xác", "Z183"],
    author: "Ban Biên Tập 83MEC",
    published_at: "2024-01-10",
    content: [
      {
        type: "paragraph",
        data: { text: "Nội dung bài viết về sản phẩm cơ khí chính xác Z183." },
      },
    ],
  },
  {
    id: 6,
    slug: "hop-dung-thiet-bi-quan-su-chong-am",
    title:
      "Hộp Đựng Thiết Bị Quân Sự Chống Ẩm – Bảo Vệ Tối Ưu Trong Mọi Điều Kiện",
    excerpt:
      "Hộp chống ẩm quân sự 83MEC bảo vệ thiết bị điện tử, khí tài trong môi trường khắc nghiệt.",
    thumbnail: "https://hevtech.vn/uploads/images/articles/20.jpg",
    category: "Sản phẩm",
    tags: ["hộp chống ẩm", "quân sự", "83MEC"],
    author: "Ban Biên Tập 83MEC",
    published_at: "2024-02-15",
    content: [
      {
        type: "paragraph",
        data: {
          text: "Nội dung bài viết về hộp đựng thiết bị quân sự chống ẩm.",
        },
      },
    ],
  },
  {
    id: 7,
    slug: "z183-ky-niem-30-nam-thanh-lap",
    title:
      "Nhà Máy Z183 Kỷ Niệm 30 Năm Thành Lập – Hành Trình Phát Triển Và Trưởng Thành",
    excerpt:
      "Lễ kỷ niệm 30 năm thành lập Nhà máy Z183 – nhìn lại chặng đường xây dựng và phát triển.",
    thumbnail: "https://hevtech.vn/uploads/images/articles/21.jpg",
    category: "Tin tức",
    tags: ["kỷ niệm", "Z183", "30 năm"],
    author: "Ban Biên Tập 83MEC",
    published_at: "2024-04-20",
    content: [
      {
        type: "paragraph",
        data: {
          text: "Nội dung bài viết kỷ niệm 30 năm thành lập nhà máy Z183.",
        },
      },
    ],
  },
  {
    id: 8,
    slug: "xuat-khau-thung-sat-sang-thi-truong-eu",
    title:
      "Xuất Khẩu Thùng Sắt Quân Dụng Sang Thị Trường EU – 83MEC Mở Rộng Hợp Tác Quốc Tế",
    excerpt:
      "83MEC ký kết hợp đồng xuất khẩu thùng sắt quân dụng sang thị trường EU, mở rộng tầm ảnh hưởng quốc tế.",
    thumbnail: "https://hevtech.vn/uploads/images/articles/22.jpg",
    category: "Tin tức",
    tags: ["xuất khẩu", "EU", "thùng sắt"],
    author: "Ban Biên Tập 83MEC",
    published_at: "2024-05-05",
    content: [
      {
        type: "paragraph",
        data: {
          text: "Nội dung bài viết về xuất khẩu thùng sắt sang thị trường EU.",
        },
      },
    ],
  },
  {
    id: 9,
    slug: "thung-cong-cu-chong-va-dap-cho-ky-thuat-vien",
    title:
      "Thùng Công Cụ Chống Va Đập Cho Kỹ Thuật Viên – Tiêu Chuẩn Công Nghiệp",
    excerpt:
      "Dòng thùng công cụ chống va đập 83MEC thiết kế riêng cho kỹ thuật viên công nghiệp và quân sự.",
    thumbnail: "https://hevtech.vn/uploads/images/articles/1.jpg",
    category: "Sản phẩm",
    tags: ["thùng công cụ", "kỹ thuật viên", "chống va đập"],
    author: "Ban Biên Tập 83MEC",
    published_at: "2024-06-12",
    content: [
      {
        type: "paragraph",
        data: { text: "Nội dung bài viết về thùng công cụ chống va đập." },
      },
    ],
  },
  {
    id: 10,
    slug: "z183-dat-chung-nhan-iso-9001-2015",
    title: "Z183 Đạt Chứng Nhận ISO 9001:2015 – Cam Kết Chất Lượng Sản Xuất",
    excerpt:
      "Nhà máy Z183 chính thức được cấp chứng nhận ISO 9001:2015, khẳng định hệ thống quản lý chất lượng đạt chuẩn quốc tế.",
    thumbnail: "https://hevtech.vn/uploads/images/articles/2.jpg",
    category: "Tin tức",
    tags: ["ISO 9001", "chất lượng", "Z183"],
    author: "Ban Biên Tập 83MEC",
    published_at: "2024-07-18",
    content: [
      {
        type: "paragraph",
        data: {
          text: "Nội dung bài viết về chứng nhận ISO 9001:2015 của Z183.",
        },
      },
    ],
  },
  {
    id: 11,
    slug: "hop-sat-dung-dan-tieu-lien-ak",
    title:
      "Hộp Sắt Đựng Đạn Tiểu Liên AK – Sản Xuất Theo Tiêu Chuẩn Bộ Quốc Phòng",
    excerpt:
      "Hộp sắt đựng đạn AK do Z183 sản xuất theo đúng tiêu chuẩn kỹ thuật quân sự của Bộ Quốc Phòng Việt Nam.",
    thumbnail: "https://hevtech.vn/uploads/images/articles/3.jpg",
    category: "Sản phẩm",
    tags: ["hộp đạn", "AK", "Bộ Quốc Phòng"],
    author: "Ban Biên Tập 83MEC",
    published_at: "2024-08-22",
    content: [
      {
        type: "paragraph",
        data: { text: "Nội dung bài viết về hộp sắt đựng đạn tiểu liên AK." },
      },
    ],
  },
  {
    id: 12,
    slug: "hop-tac-voi-doi-tac-han-quoc-cung-ung-linh-kien",
    title:
      "Z183 Hợp Tác Với Đối Tác Hàn Quốc – Cung Ứng Linh Kiện Cơ Khí Chính Xác",
    excerpt:
      "Nhà máy Z183 ký kết hợp tác với đối tác Hàn Quốc trong lĩnh vực cung ứng linh kiện cơ khí chính xác.",
    thumbnail: "https://hevtech.vn/uploads/images/articles/4.jpg",
    category: "Tin tức",
    tags: ["hợp tác", "Hàn Quốc", "linh kiện"],
    author: "Ban Biên Tập 83MEC",
    published_at: "2024-09-30",
    content: [
      {
        type: "paragraph",
        data: { text: "Nội dung bài viết về hợp tác với đối tác Hàn Quốc." },
      },
    ],
  },
];

const mockArticles: Article[] = [
  article1,
  article2,
  article3,
  article4,
  ...fakeArticles,
];

export async function seedArticles(prisma: PrismaClient) {
  console.log("Cleaning articles...");

  await prisma.article.deleteMany();

  console.log("Seeding articles...");

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
        content: article.content as any,
      },
    });
  }

  console.log("Done!");
}

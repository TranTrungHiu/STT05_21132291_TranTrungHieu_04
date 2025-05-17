# Cấu trúc thư mục chi tiết

```
STT05_21132291_TranTrungHieu_04/
├── public/               # Tài nguyên công khai
│   └── vite.svg          # Logo Vite
├── src/                  # Mã nguồn chính
│   ├── assets/           # Tài nguyên tĩnh
│   │   ├── react.svg     # Logo React
│   │   └── images/       # Thư viện hình ảnh
│   │       ├── Avatar*.jpg  # Ảnh đại diện người dùng
│   │       ├── Image*.jpg   # Ảnh thumbnail cho videos
│   │       ├── heart.png    # Icon trái tim
│   │       ├── like.png     # Icon like
│   │       ├── play.png     # Icon phát video
│   │       └── icons/       # SVG Icons
│   │           ├── bell.svg         # Icon thông báo
│   │           ├── chevron-left.svg # Icon quay lại
│   │           ├── edit.svg         # Icon chỉnh sửa
│   │           ├── eye.svg          # Icon lượt xem
│   │           ├── heart-filled.svg # Icon trái tim (đã thích)
│   │           ├── heart.svg        # Icon trái tim (chưa thích)
│   │           ├── message.svg      # Icon tin nhắn
│   │           ├── more-vertical.svg# Icon menu
│   │           ├── thumbs-up.svg    # Icon like
│   │           ├── user-check.svg   # Icon đã theo dõi
│   │           ├── user-plus.svg    # Icon theo dõi
│   │           └── video.svg        # Icon video
│   ├── screens/          # Các màn hình của ứng dụng
│   │   ├── Login/        # Màn hình đăng nhập
│   │   │   ├── LoginScreen.jsx      # Component logic
│   │   │   └── LoginScreen.css      # CSS styles
│   │   ├── Register/     # Màn hình đăng ký
│   │   │   ├── RegisterScreen.jsx   # Component logic
│   │   │   └── RegisterScreen.css   # CSS styles
│   │   ├── Home/         # Màn hình trang chủ
│   │   │   ├── HomeScreen.jsx       # Component logic
│   │   │   ├── HomeScreen.jsx.bak   # Bản backup
│   │   │   └── HomeScreen.css       # CSS styles
│   │   ├── UserProfile/  # Màn hình trang cá nhân
│   │   │   ├── UserProfileScreen.jsx# Component logic
│   │   │   └── UserProfileScreen.css# CSS styles
│   │   ├── EditProfile/  # Màn hình chỉnh sửa hồ sơ
│   │   │   ├── EditProfileScreen.jsx# Component logic
│   │   │   ├── EditProfileScreen.jsx.new# Phiên bản mới
│   │   │   └── EditProfileScreen.css# CSS styles
│   │   └── Messages/     # Màn hình tin nhắn
│   │       ├── MessageScreen.jsx    # Component logic
│   │       └── MessageScreen.css    # CSS styles
│   ├── services/         # Các dịch vụ
│   │   └── cloudinaryService.js     # Service tương tác với Cloudinary
│   ├── utils/            # Tiện ích
│   │   └── svgHelper.js             # Helper xử lý SVG
│   ├── App.css           # CSS cho App component
│   ├── App.jsx           # Component gốc của ứng dụng
│   ├── index.css         # CSS toàn cục
│   ├── main.jsx          # Điểm khởi đầu React
│   └── updateButtons.cjs # Script cập nhật nút
├── eslint.config.js      # Cấu hình ESLint
├── index.html            # HTML gốc
├── package.json          # Cấu hình project và dependencies
├── README.md             # Tài liệu dự án
├── update-follow-buttons.cjs # Script cập nhật nút theo dõi
├── UpdateFollowButtons.js    # Phiên bản JS của script cập nhật
├── UpdateHomeScreen.jsx.js   # Script cập nhật màn hình chính
└── vite.config.js        # Cấu hình Vite
```

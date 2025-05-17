# Ứng dụng Mạng xã hội Video kiểu TikTok

Ứng dụng mạng xã hội video được phát triển bằng React, mô phỏng các tính năng chính của TikTok như xem video, tương tác, theo dõi người dùng và nhắn tin.

## Tổng quan dự án

Dự án này là một ứng dụng mạng xã hội video được phát triển bằng React, mô phỏng các tính năng chính của TikTok. Ứng dụng cho phép người dùng đăng ký, đăng nhập, xem video, tương tác với video (thích, chia sẻ), cũng như theo dõi người dùng khác và nhắn tin.

## Công nghệ sử dụng

### Frontend

- **React v19.0.0**:

  - Thư viện JavaScript để xây dựng giao diện người dùng
  - Sử dụng React Hooks (useState, useEffect, useParams, useNavigate) để quản lý state và side effects
  - Sử dụng JSX để kết hợp HTML và JavaScript
  - Component-based architecture cho phép tái sử dụng code và dễ quản lý

- **React Router v7.5.1**:

  - Quản lý điều hướng trong ứng dụng
  - Hỗ trợ định tuyến động với các tham số URL
  - Cung cấp hooks như useParams để truy cập tham số từ URL
  - useNavigate cho phép điều hướng theo chương trình

- **CSS thuần**:
  - Module CSS cho phép style cô lập cho mỗi component
  - Flexbox và Grid để tạo layout linh hoạt
  - Media queries để thiết kế responsive cho các thiết bị khác nhau
  - CSS Variables để quản lý theme và các giá trị chung

### Backend & Services

- **MockAPI (https://mockapi.io)**:

  - Dịch vụ API giả lập được sử dụng để lưu trữ và quản lý dữ liệu
  - Tạo RESTful API endpoints mà không cần backend thực
  - CRUD operations (Create, Read, Update, Delete)
  - Hỗ trợ định dạng JSON cho dữ liệu

- **Cloudinary**:

  - Dịch vụ lưu trữ hình ảnh và video trực tuyến
  - API để upload, quản lý và chuyển đổi media
  - URLs bảo mật cho tài nguyên
  - Tối ưu hóa hình ảnh tự động

- **LocalStorage Web API**:
  - Lưu trữ dữ liệu người dùng trên trình duyệt
  - Duy trì trạng thái đăng nhập giữa các phiên

### Development Tools

- **Vite v6.3.1**:

  - Công cụ xây dựng frontend hiện đại, nhanh chóng
  - Hot Module Replacement (HMR) để cập nhật nhanh trong quá trình phát triển
  - Tối ưu hóa bundle và code splitting
  - Dev server với thời gian khởi động nhanh

- **ESLint v9.22.0**:

  - Công cụ linting để phát hiện và sửa lỗi
  - Cải thiện chất lượng code
  - Thực thi các quy tắc coding style

- **Git & GitHub**:
  - Quản lý phiên bản mã nguồn
  - Phân nhánh (branching) và hợp nhất (merging)
  - Theo dõi thay đổi và lịch sử dự án

## Hướng dẫn cài đặt

### Yêu cầu hệ thống

- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn
- Kết nối internet cho các API calls

### Các bước cài đặt

1. Clone repository:
   ```bash
   git clone https://github.com/TranTrungHiu/STT05_21132291_TranTrungHieu_04.git
   ```

````
2. Di chuyển đến thư mục dự án:
```bash
cd STT05_21132291_TranTrungHieu_04
````

3. Cài đặt các dependencies:

```bash
npm install
```

4. Khởi chạy ứng dụng:

```bash
npm run dev
```

5. Mở trình duyệt và truy cập `http://localhost:5173/`

### Hướng dẫn cài đặt chi tiết

#### Yêu cầu hệ thống chi tiết

- **Node.js**: Phiên bản 16.0.0 trở lên (khuyến nghị sử dụng Node.js 18.x LTS)
  - Kiểm tra phiên bản: `node -v`
- **npm**: Phiên bản 8.0.0 trở lên (đi kèm với Node.js)
  - Kiểm tra phiên bản: `npm -v`
- **Trình duyệt**: Chrome, Firefox, Edge phiên bản mới nhất
- **IDE**: Visual Studio Code (khuyến nghị)
- **Kết nối internet**: Cần thiết để kết nối đến MockAPI và Cloudinary

#### Cài đặt Node.js và npm (nếu chưa có)

- Tải và cài đặt từ [nodejs.org](https://nodejs.org/)
- Hoặc sử dụng Node Version Manager (nvm):

  ```bash
  # Cài đặt nvm trên Windows
  # Tải và cài đặt nvm-windows từ: https://github.com/coreybutler/nvm-windows/releases

  # Cài đặt Node.js version 18 LTS
  nvm install 18
  nvm use
  ```

#### Cài đặt chi tiết dependencies

```bash
# Cài đặt tất cả dependencies được liệt kê trong package.json
npm install

# Nếu gặp lỗi, thử
npm install --legacy-peer-deps

# Kiểm tra xem tất cả các dependencies đã được cài đặt
npm ls --depth=0
```

#### Kiểm tra cấu hình

- Mở file `.env` (nếu có) và đảm bảo tất cả các biến môi trường được thiết lập đúng
- Kiểm tra các API endpoints trong mã nguồn xem có cần cập nhật không

#### Chạy ứng dụng ở chế độ development

```bash
# Khởi động development server với hot-reloading
npm run dev
```

- Server sẽ khởi động và ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5173/`
- Nếu port 5173 đã được sử dụng, Vite sẽ tự động chọn port khác

#### Xây dựng ứng dụng cho production (khi cần triển khai)

```bash
# Tạo bản build tối ưu cho production
npm run build

# Kiểm tra bản build trước khi triển khai
npm run preview
```

- Các file build sẽ được tạo trong thư mục `dist/`

#### Khắc phục sự cố cài đặt

- Nếu gặp lỗi về dependencies:
  ```bash
  # Xóa node_modules và cài đặt lại
  rm -rf node_modules
  npm install
  ```
- Nếu gặp lỗi về phiên bản Node.js:
  ```bash
  # Kiểm tra phiên bản Node.js yêu cầu trong package.json
  # và đảm bảo bạn đang sử dụng phiên bản phù hợp
  node -v
  ```

## Các bước phát triển dự án từ đầu đến cuối

### 1. Thiết lập dự án

```bash
# Tạo dự án React với Vite
npm create vite@latest STT05_21132291_TranTrungHieu_04 -- --template react
cd STT05_21132291_TranTrungHieu_04

# Cài đặt dependencies cơ bản
npm install
npm install react-router-dom@latest

# Tạo cấu trúc thư mục cơ bản
mkdir -p src/screens/Login
mkdir -p src/screens/Register
mkdir -p src/screens/Home
mkdir -p src/screens/EditProfile
mkdir -p src/screens/UserProfile
mkdir -p src/screens/Messages
mkdir -p src/assets/images/icons
mkdir -p src/services
mkdir -p src/utils
```

### 2. Thiết lập API và Dịch vụ bên ngoài

#### Tạo MockAPI

1. Truy cập [MockAPI](https://mockapi.io/)
2. Tạo tài khoản hoặc đăng nhập
3. Tạo project mới
4. Tạo các resources:
   - `/users` - Thông tin người dùng
   - `/videos` - Dữ liệu video
   - `/messages` - Tin nhắn giữa người dùng

#### Thiết lập Cloudinary

1. Tạo tài khoản tại [Cloudinary](https://cloudinary.com/)
2. Lấy API key và cloud name từ dashboard
3. Cài đặt Cloudinary package:
   ```bash
   npm install cloudinary
   ```
4. Tạo service để tương tác với Cloudinary:
   ```bash
   touch src/services/cloudinaryService.js
   ```

### 3. Tạo các file CSS và Component

```bash
# Tạo các file CSS
touch src/screens/Login/LoginScreen.css
touch src/screens/Register/RegisterScreen.css
touch src/screens/Home/HomeScreen.css
touch src/screens/UserProfile/UserProfileScreen.css
touch src/screens/EditProfile/EditProfileScreen.css
touch src/screens/Messages/MessageScreen.css

# Tạo các component chính
touch src/screens/Login/LoginScreen.jsx
touch src/screens/Register/RegisterScreen.jsx
touch src/screens/Home/HomeScreen.jsx
touch src/screens/UserProfile/UserProfileScreen.jsx
touch src/screens/EditProfile/EditProfileScreen.jsx
touch src/screens/Messages/MessageScreen.jsx
```

### 4. Thiết lập Router và cấu trúc ứng dụng

1. Mở file `src/App.jsx` và cập nhật để thiết lập routing:

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import EditProfileScreen from "./screens/EditProfile/EditProfileScreen";
import UserProfileScreen from "./screens/UserProfile/UserProfileScreen";
import MessageScreen from "./screens/Messages/MessageScreen";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/edit-profile" element={<EditProfileScreen />} />
        <Route path="/profile/:userId" element={<UserProfileScreen />} />
        <Route path="/messages/:userId" element={<MessageScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### 5. Phát triển các tính năng

#### 5.1. Tạo màn hình đăng nhập (LoginScreen)

1. Xây dựng UI với form đăng nhập
2. Xử lý validation đầu vào
3. Thực hiện chức năng đăng nhập bằng cách gọi API
4. Lưu thông tin người dùng vào localStorage
5. Chuyển hướng sau khi đăng nhập thành công

#### 5.2. Tạo màn hình đăng ký (RegisterScreen)

1. Thiết kế form đăng ký với các trường cần thiết
2. Thực hiện validation dữ liệu
3. Gửi dữ liệu đăng ký đến API
4. Xử lý phản hồi và thông báo

#### 5.3. Xây dựng màn hình chính (HomeScreen)

1. Thiết kế giao diện feed video
2. Thực hiện chức năng scroll để xem video
3. Tích hợp các nút tương tác (like, comment, share)
4. Kết nối với API để lấy dữ liệu video

#### 5.4. Phát triển trang cá nhân (UserProfileScreen)

1. Hiển thị thông tin người dùng
2. Hiển thị các video đã đăng và video đã thích
3. Thực hiện chức năng theo dõi/bỏ theo dõi
4. Xây dựng tab để chuyển đổi giữa các loại nội dung

#### 5.5. Chức năng chỉnh sửa hồ sơ (EditProfileScreen)

1. Tạo form cho phép người dùng cập nhật thông tin
2. Tích hợp chức năng tải ảnh lên Cloudinary
3. Lưu các thay đổi vào API và cập nhật localStorage

#### 5.6. Tin nhắn (MessageScreen)

1. Thiết kế giao diện tin nhắn
2. Hiển thị lịch sử tin nhắn
3. Xây dựng chức năng gửi tin nhắn mới
4. Cập nhật theo thời gian thực (hoặc polling)

### 6. Tối ưu hóa và kiểm thử

#### 6.1. Tối ưu hóa hiệu suất

1. Sử dụng memo, useMemo và useCallback khi cần thiết
2. Lazy loading cho các components và routes
3. Tối ưu hóa render và state updates

#### 6.2. Kiểm thử

1. Kiểm thử UI trên nhiều kích thước màn hình
2. Kiểm tra tất cả các tính năng hoạt động đúng
3. Tìm và sửa lỗi UI/UX

### 7. Triển khai (Deployment)

1. Build ứng dụng cho production:

   ```bash
   npm run build
   ```

2. Triển khai lên hosting service (như Netlify, Vercel, GitHub Pages):
   ```bash
   # Ví dụ với Netlify CLI
   npm install -g netlify-cli
   netlify deploy
   ```

### 8. Quản lý phiên bản và git workflow

1. Khởi tạo git repository:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Tạo remote repository trên GitHub:

   ```bash
   git remote add origin https://github.com/TranTrungHiu/STT05_21132291_TranTrungHieu_04.git
   git push -u origin main
   ```

3. Sử dụng branching để phát triển tính năng:

   ```bash
   git checkout -b feature/login-screen
   # Phát triển tính năng
   git add .
   git commit -m "Add login screen"
   git push origin feature/login-screen
   # Tạo Pull Request trên GitHub
   ```

4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

### Kiến trúc ứng dụng

#### 1. Kiến trúc tổng thể

Ứng dụng được xây dựng theo mô hình client-side rendering (CSR) với React. Kiến trúc được chia thành các thành phần sau:

- **Presentation Layer**: Các React components (màn hình và UI elements)
- **State Management**: React hooks (useState, useEffect) để quản lý trạng thái ứng dụng
- **API Layer**: Fetch API để gọi đến MockAPI endpoints
- **Storage Layer**: LocalStorage để lưu trữ thông tin người dùng

#### 2. Luồng dữ liệu

1. **Đăng nhập/Đăng ký**:
   - Người dùng nhập thông tin → Validation → Gửi request đến API → Lưu vào localStorage → Điều hướng
2. **Trang chủ**:

   - Load component → Fetch videos từ API → Hiển thị UI
   - Tương tác (thích, bình luận) → Cập nhật state → Gửi request cập nhật đến API

3. **Trang cá nhân**:
   - Lấy thông tin người dùng từ localStorage → Fetch profile data từ API → Hiển thị UI
   - Theo dõi/bỏ theo dõi → Cập nhật state → Gửi request cập nhật đến API → Cập nhật localStorage

#### 3. Quản lý trạng thái

- **Local component state**: Sử dụng useState hook cho trạng thái cục bộ của component
- **Shared state**: Truyền thông qua props hoặc context
- **Persistent state**: Lưu trong localStorage

### Thư viện và dependencies chi tiết

#### 1. Core libraries

- **React (v19.0.0)**:
  - Library chính để xây dựng UI
  - Sử dụng functional components và hooks
  - Cung cấp hệ thống component-based để tái sử dụng code
- **React DOM (v19.0.0)**:
  - Gói package để render React components trong DOM
  - Xử lý cập nhật UI hiệu quả với virtual DOM

#### 2. Routing

- **React Router DOM (v7.5.1)**:
  - Quản lý điều hướng client-side
  - Cung cấp các hooks (`useParams`, `useNavigate`, `useLocation`)
  - Hỗ trợ route parameters, nested routes, và route guards

#### 3. HTTP client

- **Fetch API** (built-in):
  - API gốc của browser để thực hiện HTTP requests
  - Sử dụng Promises để xử lý asynchronous operations
  - Xử lý CRUD operations đến MockAPI

#### 4. Media services

- **Cloudinary (v2.6.1)**:
  - SDK JavaScript để tương tác với Cloudinary API
  - Xử lý upload và transformation cho images
  - Cung cấp URLs tối ưu hóa cho media

#### 5. Development tools

- **Vite (v6.3.1)**:
  - Build tool hiện đại với hiệu suất cao
  - Sử dụng ESM (ECMAScript Modules) để dev server nhanh
  - Hot Module Replacement cho developer experience tốt
  - Plugin system mở rộng (sử dụng @vitejs/plugin-react)
- **ESLint (v9.22.0)**:
  - Linting tool để phát hiện và sửa lỗi code
  - Cấu hình với eslint-plugin-react-hooks để đảm bảo tuân thủ quy tắc hooks
  - Hỗ trợ formatting và code quality standards

### Cấu trúc API

#### 1. User API

- **GET /users**: Lấy danh sách tất cả người dùng
- **GET /users/:id**: Lấy thông tin người dùng cụ thể
- **POST /users**: Tạo người dùng mới (đăng ký)
- **PUT /users/:id**: Cập nhật thông tin người dùng (chỉnh sửa profile, follow/unfollow)
- **DELETE /users/:id**: Xóa người dùng

Schema cho User object:

```javascript
{
  id: string,
  username: string,
  email: string,
  password: string,
  bio: string,
  avatarUrl: string,
  posts: number,
  followers: number,
  likes: number,
  following: string[], // Array of user IDs
  likedVideos: object[] // Array of video objects
}
```

#### 2. Video API

- **GET /videos**: Lấy danh sách videos
- **GET /videos/:id**: Lấy thông tin video cụ thể
- **POST /videos**: Tạo video mới
- **PUT /videos/:id**: Cập nhật thông tin video (like, comment)
- **DELETE /videos/:id**: Xóa video

Schema cho Video object:

```javascript
{
  id: string,
  userId: string,
  videoUrl: string,
  thumbnail: string,
  description: string,
  likes: number,
  comments: number,
  shares: number,
  views: number,
  createdAt: string
}
```

#### 3. Message API

- **GET /messages**: Lấy tất cả tin nhắn
- **GET /messages?sender=:senderId&receiver=:receiverId**: Lấy tin nhắn giữa hai người dùng
- **POST /messages**: Tạo tin nhắn mới
- **DELETE /messages/:id**: Xóa tin nhắn

Schema cho Message object:

```javascript
{
  id: string,
  senderId: string,
  receiverId: string,
  content: string,
  timestamp: string,
  read: boolean
}
```

## Chức năng của ứng dụng

### 1. Đăng ký và Đăng nhập

- **Đăng ký**: Người dùng có thể tạo tài khoản mới với username, email và mật khẩu
- **Đăng nhập**: Người dùng có thể đăng nhập bằng email/username và mật khẩu
- **Lưu trữ phiên**: Thông tin người dùng được lưu trong localStorage để duy trì phiên đăng nhập

### 2. Trang chủ (Feed video)

- Hiển thị danh sách video từ những người dùng khác
- Tương tác với video (thích, bình luận, chia sẻ)
- Cuộn vô hạn để xem thêm video

### 3. Trang cá nhân

- Xem thông tin người dùng (tên, ảnh đại diện, bio)
- Xem số lượng followers, following, và lượt thích
- Xem video đã đăng và video đã thích
- Theo dõi/Bỏ theo dõi người dùng
- Nhắn tin với người dùng

### 4. Chỉnh sửa trang cá nhân

- Cập nhật thông tin cá nhân (tên, bio)
- Thay đổi ảnh đại diện (tải lên qua Cloudinary)

### 5. Tin nhắn

- Nhắn tin với người dùng khác
- Xem lịch sử tin nhắn

## Chi tiết kỹ thuật

### 1. Cấu trúc điều hướng (React Router)

```jsx
// src/App.jsx
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/edit-profile" element={<EditProfileScreen />} />
        <Route path="/profile/:userId" element={<UserProfileScreen />} />
        <Route path="/messages/:userId" element={<MessageScreen />} />
      </Routes>
    </Router>
  );
}
```

### 2. Đăng nhập người dùng

```jsx
// src/screens/Login/LoginScreen.jsx
const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    setIsLoading(true);

    // Lấy danh sách người dùng từ API
    const response = await fetch(
      "https://6808ab9a942707d722df227c.mockapi.io/users"
    );

    if (!response.ok) {
      throw new Error("Không thể kết nối đến máy chủ");
    }

    const users = await response.json();

    // Kiểm tra thông tin đăng nhập
    const user = users.find(
      (user) =>
        (user.email === email || user.username === email) &&
        user.password === password
    );

    if (user) {
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Chuyển hướng đến trang home
      navigate("/home");
    } else {
      setError("Email/username hoặc mật khẩu không chính xác");
    }
  } catch (error) {
    setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
  } finally {
    setIsLoading(false);
  }
};
```

### 3. Upload hình ảnh với Cloudinary

```javascript
// src/services/cloudinaryService.js
export const uploadImageToCloudinary = async (
  file,
  uploadPreset = "ml_default"
) => {
  if (!file) {
    throw new Error("No file provided");
  }

  // Tạo FormData để gửi file đến Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/du1ptfs4h/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Failed to upload image");
    }
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
```

### 4. Theo dõi người dùng

```jsx
// src/screens/UserProfile/UserProfileScreen.jsx
const handleFollow = async () => {
  if (!currentUser || !profileUser) return;

  try {
    // Clone thông tin người dùng hiện tại
    const updatedUser = { ...currentUser };

    // Khởi tạo mảng following nếu chưa tồn tại
    if (!updatedUser.following) {
      updatedUser.following = [];
    }

    if (isFollowing) {
      // Bỏ theo dõi - xóa khỏi mảng
      updatedUser.following = updatedUser.following.filter(
        (id) => id !== profileUser.id
      );
    } else {
      // Theo dõi - thêm vào mảng
      updatedUser.following.push(profileUser.id);
    }

    // Cập nhật trạng thái theo dõi trong API
    const response = await fetch(
      `https://6808ab9a942707d722df227c.mockapi.io/users/${currentUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update follow status");
    }

    // Cập nhật localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Cập nhật state
    setCurrentUser(updatedUser);
    setIsFollowing(!isFollowing);

    // Cập nhật số lượng người theo dõi cho profile user
    const updatedProfileUser = { ...profileUser };
    updatedProfileUser.followers = isFollowing
      ? Number(profileUser.followers) - 1
      : Number(profileUser.followers) + 1;

    // Cập nhật số lượng người theo dõi trong API
    await fetch(
      `https://6808ab9a942707d722df227c.mockapi.io/users/${profileUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfileUser),
      }
    );

    setProfileUser(updatedProfileUser);
  } catch (error) {
    console.error("Error updating follow status:", error);
  }
};
```

### 5. Hiển thị thông tin profile

```jsx
// src/screens/UserProfile/UserProfileScreen.jsx
useEffect(() => {
  // Kiểm tra nếu người dùng đã đăng nhập
  const userData = localStorage.getItem("user");
  if (!userData) {
    navigate("/");
    return;
  }

  const fetchData = async () => {
    try {
      // Lấy thông tin người dùng hiện tại
      const parsedUser = JSON.parse(userData);
      setCurrentUser(parsedUser);

      // Lấy thông tin người dùng profile
      const response = await fetch(
        `https://6808ab9a942707d722df227c.mockapi.io/users/${userId}`
      );

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }
      const profileData = await response.json();
      setProfileUser(profileData);

      // Thiết lập danh sách video đã thích
      setLikedVideos(profileData.likedVideos || []);

      // Kiểm tra xem người dùng hiện tại có đang theo dõi profile user không
      if (
        parsedUser.following &&
        parsedUser.following.includes(profileData.id)
      ) {
        setIsFollowing(true);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setLoading(false);
    }
  };

  fetchData();
}, [userId, navigate]);
```

### 6. Format số lượt xem

```javascript
// Helper function để định dạng số lượt xem (vd: 1500000 -> 1.5M)
function formatViewCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  } else {
    return count.toString();
  }
}
```

## Khó khăn và giải pháp

### 1. Quản lý trạng thái đăng nhập

- **Khó khăn**: Duy trì trạng thái đăng nhập giữa các lần làm mới trang
- **Giải pháp**: Sử dụng localStorage để lưu trữ thông tin người dùng đã đăng nhập

### 2. Cập nhật số lượng người theo dõi

- **Khó khăn**: Đảm bảo tính nhất quán giữa UI và backend khi thay đổi trạng thái theo dõi
- **Giải pháp**: Cập nhật đồng thời cả localStorage và API, kèm theo cập nhật state cho UI

### 3. Upload hình ảnh

- **Khó khăn**: Xử lý việc tải lên hình ảnh người dùng
- **Giải pháp**: Tích hợp Cloudinary API để lưu trữ và quản lý hình ảnh

## Cải tiến có thể thực hiện trong tương lai

1. **Xác thực mạnh hơn**: Thêm JWT hoặc OAuth để xác thực người dùng
2. **Real-time chat**: Tích hợp Socket.io để có tính năng chat thời gian thực
3. **Pagination**: Tối ưu hóa việc tải video với pagination để giảm tải cho ứng dụng
4. **Tìm kiếm**: Thêm tính năng tìm kiếm người dùng và video
5. **Thông báo**: Thêm hệ thống thông báo khi có tương tác mới
6. **Redux**: Tích hợp Redux hoặc Context API để quản lý state toàn cục tốt hơn

## License

Dự án này được cấp phép theo giấy phép MIT. Xem tệp [LICENSE](./LICENSE) để biết thêm chi tiết.

## Liên hệ

Mọi câu hỏi, phản hồi hoặc đề xuất, vui lòng liên hệ [Trần Trung Hiếu](https://github.com/TranTrungHiu).

---

Phát triển bởi: Trần Trung Hiếu
MSSV: 21132291
Khóa/Nhóm: STT05

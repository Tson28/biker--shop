# 🚀 BikerHUB Backend API

Backend API hoàn chỉnh cho nền tảng thương mại điện tử BikerHUB, được xây dựng với Node.js, Express và MongoDB.

## ✨ Tính Năng Chính

- **🔐 Authentication & Authorization**: JWT tokens, role-based access control
- **👥 User Management**: Đăng ký, đăng nhập, quản lý profile
- **🏪 Product Management**: CRUD sản phẩm, tìm kiếm, lọc
- **🛒 Order Management**: Quản lý đơn hàng, trạng thái, lịch sử
- **💳 Payment Integration**: Stripe, PayPal, xử lý thanh toán
- **📁 File Upload**: Cloudinary, AWS S3, xử lý hình ảnh
- **📧 Email Services**: Nodemailer, xác thực email
- **🔍 Search & Filter**: Full-text search, lọc nâng cao
- **📊 Analytics**: Thống kê đơn hàng, doanh thu
- **🔒 Security**: Rate limiting, CORS, Helmet, validation

## 🛠️ Công Nghệ Sử Dụng

- **Runtime**: Node.js (>=16.0.0)
- **Framework**: Express.js
- **Database**: MongoDB với Mongoose
- **Authentication**: JWT, bcryptjs
- **Validation**: express-validator, Joi
- **File Upload**: Multer, Sharp, Cloudinary
- **Payment**: Stripe
- **Email**: Nodemailer
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting

## 📁 Cấu Trúc Thư Mục

```
backend/
├── config/           # Cấu hình database, environment
├── controllers/      # Logic xử lý business
├── middleware/       # Middleware functions
├── models/          # MongoDB schemas
├── routes/          # API endpoints
├── utils/           # Utility functions
├── uploads/         # File uploads
├── logs/            # Application logs
├── server.js        # Entry point
├── package.json     # Dependencies
└── README.md        # Documentation
```

## 🚀 Cài Đặt & Chạy

### 1. Cài Đặt Dependencies

```bash
cd backend
npm install
```

### 2. Cấu Hình Environment

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Cập nhật các biến môi trường:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bikerhub
JWT_SECRET=your-super-secret-jwt-key
```

### 3. Khởi Động MongoDB

```bash
# Local MongoDB
mongod

# Hoặc sử dụng Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Chạy Backend

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký người dùng mới
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Lấy thông tin profile
- `PUT /api/auth/me` - Cập nhật profile
- `POST /api/auth/change-password` - Đổi mật khẩu
- `POST /api/auth/forgot-password` - Quên mật khẩu
- `POST /api/auth/reset-password` - Reset mật khẩu

### Users
- `GET /api/users` - Lấy danh sách người dùng (Admin)
- `GET /api/users/:id` - Lấy thông tin người dùng
- `PUT /api/users/:id` - Cập nhật người dùng
- `DELETE /api/users/:id` - Xóa người dùng (Admin)

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm
- `GET /api/products/search` - Tìm kiếm sản phẩm
- `GET /api/products/featured` - Sản phẩm nổi bật
- `GET /api/products/trending` - Sản phẩm trending

### Orders
- `GET /api/orders` - Lấy danh sách đơn hàng
- `GET /api/orders/:id` - Lấy chi tiết đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id/status` - Cập nhật trạng thái
- `POST /api/orders/:id/cancel` - Hủy đơn hàng
- `POST /api/orders/:id/refund` - Xử lý hoàn tiền

### Payments
- `POST /api/payments/create-intent` - Tạo payment intent
- `POST /api/payments/confirm` - Xác nhận thanh toán
- `POST /api/payments/refund` - Hoàn tiền
- `GET /api/payments/history` - Lịch sử thanh toán

### Uploads
- `POST /api/uploads/image` - Upload hình ảnh
- `POST /api/uploads/document` - Upload tài liệu
- `DELETE /api/uploads/:id` - Xóa file

## 🔐 Authentication

### JWT Token

```bash
# Include token in headers
Authorization: Bearer <your-jwt-token>

# Or in cookies
token: <your-jwt-token>
```

### Role-based Access

- **user**: Người dùng thông thường
- **moderator**: Quản lý nội dung
- **admin**: Quản trị viên hệ thống

## 📊 Database Models

### User
- Thông tin cá nhân, địa chỉ
- Preferences, wishlist, reviews
- Role-based permissions
- Security features (login attempts, account lock)

### Product
- Thông tin sản phẩm chi tiết
- Images, specifications, features
- Stock management, pricing
- SEO optimization, categories

### Order
- Order items, customer details
- Shipping & billing addresses
- Payment information
- Status tracking, history

## 🚀 Deployment

### Production Environment

```bash
# Set environment variables
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bikerhub

# Install dependencies
npm ci --only=production

# Start server
npm start
```

### Docker Deployment

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "User"
```

## 📝 Logging

Backend sử dụng Winston để logging:

- **Console**: Development mode
- **Files**: Production mode (combined.log, error.log)
- **Levels**: error, warn, info, debug

## 🔒 Security Features

- **Rate Limiting**: Giới hạn số request
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers
- **Input Validation**: Sanitize user input
- **JWT**: Secure token-based authentication
- **Password Hashing**: bcryptjs encryption

## 📞 Support

Nếu có vấn đề hoặc câu hỏi:

1. Kiểm tra logs trong thư mục `logs/`
2. Xem MongoDB connection
3. Verify environment variables
4. Check API endpoints với Postman/Insomnia

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

---

**BikerHUB Backend** - Xây dựng với ❤️ cho cộng đồng xe đạp!

# 🚴‍♂️ BikerHUB - Full Stack E-commerce Platform

**BikerHUB** là một nền tảng thương mại điện tử hoàn chỉnh dành cho việc mua bán xe đạp và phụ kiện, được xây dựng với kiến trúc full-stack hiện đại.

## ✨ Tính Năng Chính

### 🛒 E-commerce Features
- **Product Management**: Quản lý sản phẩm với hình ảnh, mô tả chi tiết
- **Shopping Cart**: Giỏ hàng hoàn chỉnh với localStorage
- **Order Processing**: Quy trình đặt hàng và thanh toán
- **User Management**: Hệ thống đăng ký, đăng nhập, profile
- **Admin Panel**: Bảng điều khiển quản trị với phân quyền
- **Search & Filter**: Tìm kiếm và lọc sản phẩm nâng cao
- **Wishlist**: Danh sách yêu thích
- **Reviews & Ratings**: Đánh giá và nhận xét sản phẩm

### 🔐 Security & Authentication
- **JWT Authentication**: Xác thực người dùng an toàn
- **Role-based Access**: Phân quyền user, moderator, admin
- **Password Security**: Mã hóa mật khẩu với bcryptjs
- **Rate Limiting**: Giới hạn request để bảo vệ API
- **Input Validation**: Kiểm tra và làm sạch dữ liệu đầu vào

### 📱 User Experience
- **Responsive Design**: Tối ưu cho mọi thiết bị
- **Modern UI/UX**: Giao diện đẹp mắt với animations
- **Quick View**: Xem nhanh sản phẩm không cần rời trang
- **Real-time Updates**: Cập nhật giỏ hàng và trạng thái real-time
- **Accessibility**: Hỗ trợ người dùng khuyết tật

## 🏗️ Kiến Trúc Hệ Thống

### Frontend (Client-side)
- **HTML5 & CSS3**: Cấu trúc và styling hiện đại
- **Vanilla JavaScript**: ES6+ với classes và modules
- **Responsive Grid**: CSS Grid và Flexbox
- **CSS Variables**: Hệ thống design tokens nhất quán
- **Animations**: CSS transitions, keyframes, và Intersection Observer

### Backend (Server-side)
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database với Mongoose ODM
- **Redis**: Caching và session management
- **JWT**: JSON Web Tokens cho authentication
- **RESTful API**: API endpoints chuẩn REST

### Infrastructure
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Reverse proxy và static file serving
- **MongoDB Express**: Database admin interface
- **Redis Commander**: Redis admin interface

## 📁 Cấu Trúc Dự Án

```
Biker-HUB-Full-Stack-website-development-project/
├── frontend/                 # Frontend files
│   ├── index.html           # Trang chủ
│   ├── bikes.html           # Trang sản phẩm
│   ├── sell.html            # Trang bán xe
│   ├── checkout.html        # Trang thanh toán
│   ├── orders.html          # Trang đơn hàng
│   ├── login.html           # Trang đăng nhập
│   ├── signup.html          # Trang đăng ký
│   ├── style.css            # CSS chung
│   └── script.js            # JavaScript chung
├── backend/                  # Backend API
│   ├── config/              # Cấu hình
│   ├── controllers/         # Business logic
│   ├── middleware/          # Middleware functions
│   ├── models/              # Database schemas
│   ├── routes/              # API endpoints
│   ├── utils/               # Utility functions
│   ├── uploads/             # File uploads
│   ├── logs/                # Application logs
│   ├── server.js            # Entry point
│   ├── package.json         # Dependencies
│   ├── Dockerfile           # Container config
│   └── README.md            # Backend docs
├── docker-compose.yml       # Docker orchestration
└── README.md                # Project documentation
```

## 🚀 Cài Đặt & Chạy

### Prerequisites
- **Node.js** >= 16.0.0
- **Docker** & Docker Compose
- **MongoDB** (local hoặc cloud)
- **Git**

### Quick Start với Docker

1. **Clone repository**
```bash
git clone <repository-url>
cd Biker-HUB-Full-Stack-website-development-project
```

2. **Chạy toàn bộ hệ thống**
```bash
docker-compose up -d
```

3. **Truy cập ứng dụng**
- Frontend: http://localhost
- Backend API: http://localhost:5000
- MongoDB Admin: http://localhost:8081
- Redis Admin: http://localhost:8082

### Development Setup

1. **Backend Setup**
```bash
cd backend
npm install
npm run dev
```

2. **Frontend Setup**
```bash
# Mở các file HTML trong browser
# Hoặc sử dụng live server
npx live-server frontend/
```

3. **Database Setup**
```bash
# Local MongoDB
mongod

# Hoặc Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
- `POST /auth/register` - Đăng ký người dùng
- `POST /auth/login` - Đăng nhập
- `POST /auth/logout` - Đăng xuất
- `GET /auth/me` - Thông tin profile
- `PUT /auth/me` - Cập nhật profile

### Product Endpoints
- `GET /products` - Danh sách sản phẩm
- `GET /products/:id` - Chi tiết sản phẩm
- `POST /products` - Tạo sản phẩm mới
- `PUT /products/:id` - Cập nhật sản phẩm
- `DELETE /products/:id` - Xóa sản phẩm
- `GET /products/search` - Tìm kiếm sản phẩm

### Order Endpoints
- `GET /orders` - Danh sách đơn hàng
- `GET /orders/:id` - Chi tiết đơn hàng
- `POST /orders` - Tạo đơn hàng mới
- `PUT /orders/:id/status` - Cập nhật trạng thái

## 🔧 Cấu Hình

### Environment Variables
```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/bikerhub
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Cloud Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Database Models

#### User Schema
- Personal information (username, email, password)
- Role-based permissions (user, moderator, admin)
- Addresses và preferences
- Security features (login attempts, account lock)

#### Product Schema
- Product details (name, description, price)
- Images và specifications
- Stock management
- SEO optimization

#### Order Schema
- Order items và customer details
- Shipping & billing addresses
- Payment information
- Status tracking

## 🎨 Frontend Features

### Responsive Design
- Mobile-first approach
- CSS Grid và Flexbox layouts
- Media queries cho breakpoints
- Touch-friendly interactions

### Modern UI Components
- Glassmorphism effects
- Smooth animations và transitions
- Loading states và skeletons
- Toast notifications
- Modal dialogs

### JavaScript Features
- ES6+ classes và modules
- LocalStorage management
- Event delegation
- Intersection Observer API
- Debounced search

## 🔒 Security Features

### Authentication & Authorization
- JWT token-based authentication
- Role-based access control
- Password hashing với bcryptjs
- Account lockout protection

### API Security
- Rate limiting
- CORS configuration
- Input validation & sanitization
- Helmet security headers
- Request size limits

### Data Protection
- MongoDB injection prevention
- XSS protection
- CSRF protection
- Secure file uploads

## 📊 Performance & Optimization

### Frontend
- CSS và JavaScript minification
- Image optimization
- Lazy loading
- Service worker caching

### Backend
- Database indexing
- Query optimization
- Redis caching
- Compression middleware
- Connection pooling

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test                    # Run all tests
npm run test:coverage      # Run with coverage
npm test -- --grep "User"  # Run specific tests
```

### Frontend Testing
- Manual testing với browser dev tools
- Cross-browser compatibility
- Mobile responsiveness testing
- Accessibility testing

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

### Docker Production
```bash
# Build production image
docker build -t bikerhub-backend:prod ./backend

# Run with production config
docker run -d -p 5000:5000 --env-file .env.prod bikerhub-backend:prod
```

### Cloud Deployment
- **Heroku**: Easy deployment với Git
- **AWS**: EC2, ECS, hoặc Lambda
- **Google Cloud**: App Engine hoặc Cloud Run
- **Azure**: App Service hoặc Container Instances

## 📈 Monitoring & Logging

### Application Logs
- Winston logging framework
- File-based logging (production)
- Console logging (development)
- Error tracking và monitoring

### Health Checks
- API health endpoint
- Database connection monitoring
- Service availability checks
- Performance metrics

## 🤝 Contributing

1. **Fork repository**
2. **Create feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests cho new features
- Update documentation
- Follow coding standards

## 📞 Support & Community

### Getting Help
1. Check documentation và README files
2. Search existing issues
3. Create new issue với detailed description
4. Join community discussions

### Community Channels
- GitHub Issues
- Discussion forums
- Social media groups
- Developer meetups

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** cho hình ảnh sản phẩm
- **MongoDB** cho database solution
- **Express.js** cho web framework
- **Node.js** community cho support

## 🚀 Roadmap

### Phase 1 (Current)
- ✅ Basic e-commerce functionality
- ✅ User authentication
- ✅ Product management
- ✅ Order processing

### Phase 2 (Next)
- 🔄 Advanced search & filtering
- 🔄 Payment gateway integration
- 🔄 Email notifications
- 🔄 Admin dashboard

### Phase 3 (Future)
- 📋 Mobile app development
- 📋 AI-powered recommendations
- 📋 Multi-language support
- 📋 Advanced analytics

---

**BikerHUB** - Xây dựng với ❤️ cho cộng đồng xe đạp!

*Nếu bạn thấy dự án này hữu ích, hãy ⭐ star repository và �� fork để ủng hộ!*

# 🚀 BikerHUB Backend API v2.0

Modern, scalable backend API for the BikerHUB e-commerce platform built with Node.js, Express, and MongoDB.

## ✨ Features

### 🏗️ **Architecture & Performance**
- **Modern ES6+ Syntax** with ES modules
- **Multi-stage Docker builds** for optimized production images
- **Advanced caching** with Redis
- **Database optimization** and health monitoring
- **Performance monitoring** and analytics
- **Graceful shutdown** handling

### 🔒 **Security & Reliability**
- **JWT authentication** with refresh tokens
- **Rate limiting** and DDoS protection
- **Input validation** and sanitization
- **XSS protection** and security headers
- **CORS configuration** with whitelist
- **Session management** with Redis
- **Password hashing** with bcrypt

### 📊 **Monitoring & Logging**
- **Structured logging** with Winston
- **Request/response logging** with Morgan
- **Performance metrics** tracking
- **Health checks** for all services
- **Error tracking** and reporting
- **Audit trails** for security events

### 🚀 **Development Experience**
- **Hot reloading** with Nodemon
- **ESLint** and **Prettier** configuration
- **Comprehensive testing** setup with Jest
- **API documentation** with Swagger/OpenAPI
- **TypeScript support** (optional)
- **Debug logging** in development

### 📈 **Business Features**
- **User management** with roles and permissions
- **Product catalog** with search and filtering
- **Order management** with status tracking
- **Payment processing** with Stripe/PayPal
- **File uploads** with image processing
- **Email notifications** with templates
- **Analytics** and reporting

## 🛠️ Tech Stack

### **Core Technologies**
- **Node.js 18+** - JavaScript runtime
- **Express.js 4.18+** - Web framework
- **MongoDB 7.0+** - NoSQL database
- **Mongoose 8.0+** - ODM for MongoDB
- **Redis 7.2+** - In-memory data store

### **Security & Middleware**
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **JWT** - JSON Web Tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### **File Handling & Storage**
- **Multer** - File upload handling
- **Sharp** - Image processing
- **Cloudinary** - Cloud image storage
- **AWS S3** - Alternative storage option

### **Payment & External Services**
- **Stripe** - Payment processing
- **PayPal** - Alternative payment
- **Nodemailer** - Email services
- **Twilio** - SMS notifications

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Nodemon** - Development server
- **Swagger** - API documentation

## 📁 Project Structure

```
backend/
├── config/                 # Configuration files
│   ├── config.js          # Main configuration
│   └── database.js        # Database connection
├── controllers/            # Route controllers
│   ├── authController.js  # Authentication logic
│   ├── userController.js  # User management
│   ├── productController.js # Product operations
│   └── orderController.js # Order management
├── middleware/             # Custom middleware
│   ├── auth.js            # Authentication middleware
│   ├── validation.js      # Input validation
│   └── errorHandler.js    # Error handling
├── models/                 # Database models
│   ├── User.js            # User schema
│   ├── Product.js         # Product schema
│   └── Order.js           # Order schema
├── routes/                 # API routes
│   ├── auth.js            # Authentication routes
│   ├── users.js           # User routes
│   ├── products.js        # Product routes
│   └── orders.js          # Order routes
├── utils/                  # Utility functions
│   ├── logger.js          # Logging configuration
│   ├── swagger.js         # API documentation
│   └── cron.js            # Scheduled tasks
├── uploads/                # File uploads
├── logs/                   # Application logs
├── temp/                   # Temporary files
├── tests/                  # Test files
├── Dockerfile              # Docker configuration
├── package.json            # Dependencies
└── server.js               # Main application
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and npm 9+
- MongoDB 7.0+
- Redis 7.2+
- Docker & Docker Compose (optional)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tson28/biker--shop.git
   cd biker--shop/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### **Docker Setup**

1. **Build and start services**
   ```bash
   docker-compose up -d
   ```

2. **View logs**
   ```bash
   docker-compose logs -f backend
   ```

3. **Stop services**
   ```bash
   docker-compose down
   ```

## 🔧 Configuration

### **Environment Variables**

Create a `.env` file in the backend directory:

```env
# Server
NODE_ENV=development
PORT=5000
SESSION_SECRET=your-secret-key

# Database
MONGODB_URI=mongodb://localhost:27017/bikerhub

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Payment
STRIPE_SECRET_KEY=your-stripe-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
```

### **Development vs Production**

The application automatically adjusts configuration based on `NODE_ENV`:

- **Development**: Debug logging, relaxed rate limits, console output
- **Production**: Error logging only, strict rate limits, file logging

## 📚 API Documentation

### **Swagger UI**
- **Development**: http://localhost:5000/api-docs
- **Production**: https://api.bikerhub.com/api-docs

### **API Endpoints**

#### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/forgot-password` - Password reset

#### **Users**
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/:id` - Get user by ID (admin)
- `PUT /api/users/:id` - Update user (admin)

#### **Products**
- `GET /api/products` - List products
- `POST /api/products` - Create product (admin)
- `GET /api/products/:id` - Get product details
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

#### **Orders**
- `GET /api/orders` - List user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status

## 🧪 Testing

### **Run Tests**
```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Specific test file
npm test -- --testPathPattern=auth
```

### **Test Structure**
- **Unit tests** for controllers and utilities
- **Integration tests** for API endpoints
- **Database tests** with test database
- **Mock services** for external APIs

## 📊 Monitoring & Health Checks

### **Health Endpoints**
- `GET /health` - Application health
- `GET /health/db` - Database health
- `GET /health/redis` - Redis health

### **Metrics**
- Request/response times
- Database query performance
- Memory usage
- Error rates
- API usage statistics

## 🔒 Security Features

### **Authentication & Authorization**
- JWT-based authentication
- Role-based access control
- Session management
- Password policies

### **Data Protection**
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

### **Rate Limiting**
- IP-based rate limiting
- User-based rate limiting
- Adaptive rate limiting
- DDoS protection

## 🚀 Deployment

### **Production Checklist**
- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Database backups configured
- [ ] Monitoring enabled
- [ ] Log rotation configured
- [ ] Health checks enabled

### **Docker Deployment**
```bash
# Build production image
docker build -t bikerhub-backend:latest .

# Run with environment variables
docker run -d \
  --name bikerhub-backend \
  -p 5000:5000 \
  --env-file .env \
  bikerhub-backend:latest
```

### **Environment-Specific Configs**
- **Development**: Local MongoDB, Redis, and services
- **Staging**: Staging database, limited external services
- **Production**: Production database, full external services

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### **Code Style**
- Use ESLint and Prettier
- Follow ES6+ best practices
- Write comprehensive tests
- Document new endpoints

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [API Docs](http://localhost:5000/api-docs)
- **Issues**: [GitHub Issues](https://github.com/Tson28/biker--shop/issues)
- **Email**: support@bikerhub.com

## 🔄 Changelog

### **v2.0.0** (Current)
- Modern ES6+ syntax with ES modules
- Enhanced security features
- Advanced monitoring and logging
- Multi-stage Docker builds
- Comprehensive testing setup
- API documentation with Swagger
- Performance optimizations

### **v1.0.0**
- Initial release
- Basic CRUD operations
- JWT authentication
- File uploads
- Payment integration

---

**Built with ❤️ by the BikerHUB Team**

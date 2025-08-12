# 🚀 BikerHUB - Full-Stack E-commerce Platform

Modern, scalable e-commerce platform for bicycle enthusiasts built with cutting-edge technologies.

## 🚀 **Quick Access (Click to open)**

| Service | URL | Status |
|---------|-----|--------|
| 🌐 **Website** | [http://localhost:8000](http://localhost:8000) | ✅ Ready |
| 🔧 **Backend** | [http://localhost:5000](http://localhost:5000) | ✅ Ready |
| 📚 **API Docs** | [http://localhost:5000/api-docs](http://localhost:5000/api-docs) | ✅ Ready |

## 📋 **Quick Start Commands**

```bash
# Start Backend (Terminal 1)
cd backend && node server.js

# Start Frontend (Terminal 2)  
cd frontend && python3 -m http.server 8000
```

![BikerHUB](https://img.shields.io/badge/BikerHUB-v2.0.0-blue?style=for-the-badge&logo=bike)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0+-green?style=for-the-badge&logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)

## ✨ Features

### 🎨 **Frontend (Modern Web App)**
- **Responsive Design** - Mobile-first approach with modern UI/UX
- **Advanced Animations** - Smooth transitions and micro-interactions
- **Real-time Updates** - Live cart updates and notifications
- **Progressive Web App** - Offline support and app-like experience
- **Advanced Search** - Smart filtering, sorting, and search
- **Wishlist Management** - Save and organize favorite products
- **Order Tracking** - Real-time order status updates

### 🚀 **Backend (Scalable API)**
- **Modern ES6+ Architecture** - ES modules and async/await
- **Advanced Security** - JWT, rate limiting, input validation
- **Performance Monitoring** - Real-time metrics and health checks
- **Automated Tasks** - Cron jobs for maintenance and analytics
- **Comprehensive Logging** - Structured logging with Winston
- **API Documentation** - Interactive Swagger/OpenAPI docs
- **Database Optimization** - Advanced MongoDB features

### 🐳 **Infrastructure (Production Ready)**
- **Multi-stage Docker** - Optimized production images
- **Container Orchestration** - Docker Compose with health checks
- **Reverse Proxy** - Nginx with SSL termination
- **Database Clustering** - MongoDB with Redis caching
- **Monitoring** - Health checks and performance metrics
- **Auto-scaling** - Ready for Kubernetes deployment

## 🛠️ Tech Stack

### **Frontend Technologies**
- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern layouts with Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript** - ES6+ with modules and classes
- **Progressive Web App** - Service workers and offline support

### **Backend Technologies**
- **Node.js 18+** - Latest LTS with ES modules
- **Express.js 4.18+** - Fast, unopinionated web framework
- **MongoDB 7.0+** - NoSQL database with advanced features
- **Redis 7.2+** - In-memory data store for caching
- **JWT** - Secure authentication and authorization

### **Development Tools**
- **ESLint & Prettier** - Code quality and formatting
- **Jest** - Comprehensive testing framework
- **Swagger** - API documentation and testing
- **Docker** - Containerization and deployment
- **Git** - Version control and collaboration

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and npm 9+
- MongoDB 7.0+
- Redis 7.2+
- Docker & Docker Compose (recommended)

### **🚀 Get Started in 2 Minutes**

1. **Clone & Install:**
   ```bash
   git clone https://github.com/Tson28/biker--shop.git
   cd biker--shop
   cd backend && npm install
   ```

2. **Start Services:**
   ```bash
   # Terminal 1: Backend
   cd backend && node server.js
   
   # Terminal 2: Frontend  
   cd frontend && python3 -m http.server 8000
   ```

3. **Open in Browser:**
   - 🌐 **Website**: [http://localhost:8000](http://localhost:8000)
   - 🔧 **API**: [http://localhost:5000](http://localhost:5000)
   - 📚 **Docs**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## 🌐 **How to Access & Run the Application**

### **Method 1: Run Both Services (Recommended)**

1. **Start Backend Server:**
   ```bash
   cd backend
   npm install
   node server.js
   ```
   - Backend will run on: **http://localhost:5000**
   - API Documentation: **http://localhost:5000/api-docs**
   - Health Check: **http://localhost:5000/health**

2. **Start Frontend Server:**
   ```bash
   cd frontend
   python3 -m http.server 8000
   ```
   - Website will be available at: **http://localhost:8000**

3. **Access Points:**
   - 🌐 **Main Website**: http://localhost:8000
   - 🔧 **Backend API**: http://localhost:5000
   - 📚 **API Docs**: http://localhost:5000/api-docs
   - ✅ **Health Check**: http://localhost:5000/health

### **Method 2: Docker (Alternative)**

1. **Start all services:**
   ```bash
   docker-compose up -d
   ```

2. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost:5000
   - API Docs: http://localhost:5000/api-docs

### **Method 3: Frontend Only (Static Files)**

1. **Open directly in browser:**
   ```bash
   cd frontend
   # Double-click index.html or open in browser
   ```

2. **Or use any local server:**
   ```bash
   cd frontend
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve -s . -p 8000
   
   # Using PHP
   php -S localhost:8000
   ```

## 🎯 **Quick Access Guide**

| Service | URL | Description |
|---------|-----|-------------|
| 🏠 **Website** | http://localhost:8000 | Main BikerHUB website |
| 🔧 **Backend** | http://localhost:5000 | API server |
| 📚 **API Docs** | http://localhost:5000/api-docs | Interactive API documentation |
| ✅ **Health** | http://localhost:5000/health | Server status check |
| 🔐 **Auth API** | http://localhost:5000/api/auth | Authentication endpoints |
| 👥 **Users API** | http://localhost:5000/api/users | User management |
| 🚲 **Products API** | http://localhost:5000/api/products | Product catalog |
| 📦 **Orders API** | http://localhost:5000/api/orders | Order management |

## 🚨 **Troubleshooting**

### **Port 8000 Not Accessible:**
```bash
# Check if port is in use
lsof -i :8000

# Kill process if needed
kill -9 <PID>

# Restart frontend server
cd frontend
python3 -m http.server 8000
```

### **Port 5000 Not Accessible:**
```bash
# Check if port is in use
lsof -i :5000

# Kill process if needed
kill -9 <PID>

# Restart backend server
cd backend
node server.js
```

### **MongoDB Connection Issues:**
```bash
# Check MongoDB status
brew services list | grep mongodb

# Start MongoDB if not running
brew services start mongodb-community
```

### **Option 1: Docker (Recommended)**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tson28/biker--shop.git
   cd biker--shop
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:5000
   - API Docs: http://localhost:5000/api-docs
   - MongoDB Admin: http://localhost:8081
   - Redis Admin: http://localhost:8082

### **Option 2: Local Development**

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   # Or run directly: node server.js
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   # Option A: Open directly in browser
   # Double-click index.html or open in browser
   
   # Option B: Use local server (recommended)
   python3 -m http.server 8000
   # Website will be available at: http://localhost:8000
   ```

## 📁 Project Structure

```
BikerHUB-Full-Stack-website-development-project/
├── frontend/                    # Frontend application
│   ├── index.html              # Homepage
│   ├── bikes.html              # Product catalog
│   ├── login.html              # Authentication
│   ├── signup.html             # User registration
│   ├── sell.html               # Sell your bike
│   ├── checkout.html           # Checkout process
│   ├── orders.html             # Order management
│   ├── style.css               # Modern CSS with variables
│   └── script.js               # ES6+ JavaScript classes
├── backend/                     # Backend API
│   ├── config/                 # Configuration files
│   ├── controllers/            # Business logic
│   ├── middleware/             # Custom middleware
│   ├── models/                 # Database schemas
│   ├── routes/                 # API endpoints
│   ├── utils/                  # Utility functions
│   ├── uploads/                # File uploads
│   ├── logs/                   # Application logs
│   ├── server.js               # Main application
│   ├── package.json            # Dependencies
│   └── Dockerfile              # Container configuration
├── nginx/                      # Reverse proxy configuration
├── docker-compose.yml          # Service orchestration
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

## 🔧 Configuration

### **Environment Variables**

Create environment files for different environments:

```bash
# Development
cp backend/.env.example backend/.env

# Production
cp backend/.env.example backend/.env.production
```

### **Key Configuration Options**

- **Database**: MongoDB connection and options
- **Redis**: Caching and session storage
- **JWT**: Authentication and security
- **Email**: SMTP configuration for notifications
- **Payment**: Stripe and PayPal integration
- **Storage**: Cloudinary or AWS S3 for files
- **Monitoring**: Sentry and New Relic integration

## 📚 API Documentation

### **Interactive API Docs**
- **Swagger UI**: http://localhost:5000/api-docs
- **OpenAPI Spec**: http://localhost:5000/api-docs.json

### **Core Endpoints**
- **Authentication**: `/api/auth/*`
- **Users**: `/api/users/*`
- **Products**: `/api/products/*`
- **Orders**: `/api/orders/*`
- **Payments**: `/api/payments/*`
- **Uploads**: `/api/uploads/*`
- **Analytics**: `/api/analytics/*`

## 🧪 Testing

### **Backend Testing**
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

### **Frontend Testing**
```bash
cd frontend
# Open in browser and test manually
# Or use testing frameworks like Jest, Cypress
```

## 📊 Monitoring & Health

### **Health Checks**
- **Application**: `GET /health`
- **Database**: `GET /health/db`
- **Redis**: `GET /health/redis`

### **Performance Metrics**
- Request/response times
- Database query performance
- Memory usage and optimization
- Error rates and tracking

## 🚀 Deployment

### **Production Checklist**
- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Database backups enabled
- [ ] Monitoring and alerting
- [ ] Log rotation configured
- [ ] Health checks enabled
- [ ] Rate limiting configured

### **Deployment Options**

1. **Docker Compose** (Recommended)
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

2. **Kubernetes**
   ```bash
   kubectl apply -f k8s/
   ```

3. **Cloud Platforms**
   - AWS ECS/Fargate
   - Google Cloud Run
   - Azure Container Instances
   - DigitalOcean App Platform

## 🔒 Security Features

### **Authentication & Authorization**
- JWT-based authentication
- Role-based access control
- Session management
- Password policies

### **Data Protection**
- Input validation and sanitization
- XSS and CSRF protection
- SQL injection prevention
- Rate limiting and DDoS protection

### **Infrastructure Security**
- Container security best practices
- Network isolation
- Secret management
- Regular security updates

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests for new functionality**
5. **Ensure all tests pass**
6. **Submit a pull request**

### **Development Guidelines**
- Follow ES6+ best practices
- Write comprehensive tests
- Document new features
- Use ESLint and Prettier
- Follow conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [API Docs](http://localhost:5000/api-docs)
- **Issues**: [GitHub Issues](https://github.com/Tson28/biker--shop/issues)
- **Email**: support@bikerhub.com
- **Discord**: [Join our community](https://discord.gg/bikerhub)

## 🔄 Changelog

### **v2.0.0** (Current)
- **Modern Architecture**: ES6+ modules and async/await
- **Enhanced Frontend**: Advanced UI components and animations
- **Scalable Backend**: Performance monitoring and optimization
- **Production Ready**: Docker, health checks, and monitoring
- **Comprehensive Testing**: Jest framework and coverage
- **API Documentation**: Interactive Swagger/OpenAPI docs

### **v1.0.0**
- Basic e-commerce functionality
- User authentication and management
- Product catalog and orders
- Payment integration
- File uploads

## 🌟 Acknowledgments

- **Bike Community** - For inspiration and feedback
- **Open Source Contributors** - For amazing tools and libraries
- **Modern Web Standards** - For cutting-edge technologies

---

**Built with ❤️ by the BikerHUB Team**

[![GitHub stars](https://img.shields.io/github/stars/Tson28/biker--shop?style=social)](https://github.com/Tson28/biker--shop/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Tson28/biker--shop?style=social)](https://github.com/Tson28/biker--shop/network)
[![GitHub issues](https://img.shields.io/github/issues/Tson28/biker--shop)](https://github.com/Tson28/biker--shop/issues)
[![GitHub license](https://img.shields.io/github/license/Tson28/biker--shop)](https://github.com/Tson28/biker--shop/blob/main/LICENSE)

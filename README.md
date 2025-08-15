# 🚀 BikerHUB - Full-Stack E-commerce Platform

Modern, scalable e-commerce platform for bicycle enthusiasts built with cutting-edge technologies.

## 🚀 **Quick Access (Click to open)**

| Service | URL | Status |
|---------|-----|--------|
| 🌐 **Website** | [http://localhost:8000](http://localhost:8000) | ✅ Ready |
| 🔧 **Backend** | [http://localhost:5000](http://localhost:5000) | ✅ Ready |
| 📚 **API Docs** | [http://localhost:5000/api-docs](http://localhost:5000/api-docs) | ✅ Ready |
| 👨‍💼 **Admin Dashboard** | [http://localhost:8000/admin.html](http://localhost:8000/admin.html) | ✅ Ready |
| 👤 **User Profile** | [http://localhost:8000/profile.html](http://localhost:8000/profile.html) | ✅ Ready |

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
- **User Profile System** - Complete user management and preferences
- **Admin Dashboard** - Comprehensive admin panel for business management

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

## 🆕 **New Features Added**

### 👨‍💼 **Admin Dashboard**
- **Product Management** - Add, edit, delete products with full CRUD operations
- **Order Management** - Track and manage all customer orders
- **User Management** - Monitor and manage user accounts
- **Analytics & Reports** - Sales data, top products, revenue tracking
- **System Settings** - Configure site preferences and maintenance mode
- **Real-time Statistics** - Live dashboard with key business metrics

### 👤 **User Profile System**
- **Personal Information** - Edit profile details, bio, and preferences
- **Order History** - Complete order tracking and history
- **Wishlist Management** - Save favorites and manage wishlist
- **Address Management** - Multiple shipping addresses with CRUD operations
- **Security Settings** - Password change and account security
- **Notification Preferences** - Customize email and SMS notifications

### 🔐 **Enhanced Authentication**
- **Role-based Access Control** - Admin and user roles with permissions
- **Secure Token Management** - JWT with refresh token support
- **Password Security** - Strong password requirements and validation
- **Session Management** - Secure session handling and timeout

### 📱 **Mobile-First Design**
- **Responsive Layout** - Optimized for all device sizes
- **Touch-Friendly Interface** - Mobile-optimized interactions
- **Progressive Web App** - App-like experience on mobile devices
- **Offline Support** - Service worker for offline functionality

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

3. **Access the Platform:**
   - 🌐 **Website**: http://localhost:8000
   - 🔧 **Backend API**: http://localhost:5000
   - 📚 **API Docs**: http://localhost:5000/api-docs
   - 👨‍💼 **Admin Dashboard**: http://localhost:8000/admin.html
   - 👤 **User Profile**: http://localhost:8000/profile.html

## 📁 **Project Structure**

```
BikerHUB/
├── frontend/                 # Frontend application
│   ├── index.html           # Main homepage
│   ├── admin.html           # Admin dashboard
│   ├── profile.html         # User profile page
│   ├── login.html           # User authentication
│   ├── signup.html          # User registration
│   ├── checkout.html        # Shopping cart checkout
│   ├── orders.html          # Order management
│   ├── bikes.html           # Product catalog
│   ├── sell.html            # Product selling
│   ├── style.css            # Main stylesheet
│   ├── enhanced-style.css   # Enhanced styles
│   ├── script.js            # Main JavaScript
│   ├── enhanced-script.js   # Enhanced functionality
│   ├── admin-script.js      # Admin dashboard logic
│   └── profile-script.js    # User profile logic
├── backend/                  # Backend API server
│   ├── server.js            # Main server file
│   ├── config/              # Configuration files
│   ├── routes/              # API route handlers
│   ├── controllers/         # Business logic
│   ├── models/              # Database models
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   └── uploads/             # File uploads
├── docker-compose.yml       # Docker services
└── README.md                # Project documentation
```

## 🔐 **Authentication & Security**

### **User Roles**
- **Customer** - Browse products, place orders, manage profile
- **Admin** - Full system access, product management, analytics

### **Security Features**
- JWT token authentication
- Rate limiting and DDoS protection
- Input validation and sanitization
- CORS and security headers
- Password hashing with bcrypt
- Session management

## 📊 **Admin Dashboard Features**

### **Dashboard Overview**
- Total products, orders, users, and revenue
- Recent order activity
- Sales performance metrics
- System health status

### **Product Management**
- Add new products with images and details
- Edit existing product information
- Manage inventory and stock levels
- Product categorization and search

### **Order Management**
- View all customer orders
- Update order status (pending, processing, shipped, delivered)
- Order filtering and search
- Customer order history

### **User Management**
- Monitor user accounts and activity
- User role management
- Account status control
- User analytics and insights

### **Analytics & Reports**
- Sales performance tracking
- Top-selling products
- Revenue analytics
- Customer behavior insights

## 👤 **User Profile Features**

### **Personal Information**
- Edit profile details (name, phone, bio)
- Profile picture management
- Account preferences
- Privacy settings

### **Order Management**
- Complete order history
- Order status tracking
- Order details and receipts
- Reorder functionality

### **Wishlist System**
- Save favorite products
- Organize wishlist items
- Quick add to cart
- Wishlist sharing

### **Address Management**
- Multiple shipping addresses
- Address editing and deletion
- Default address selection
- Address validation

### **Security & Preferences**
- Password change
- Two-factor authentication
- Notification preferences
- Privacy controls

## 🚀 **Deployment**

### **Docker Deployment**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### **Production Deployment**
- Configure environment variables
- Set up SSL certificates
- Configure reverse proxy (Nginx)
- Set up monitoring and logging
- Configure backup strategies

## 🧪 **Testing**

### **Backend Testing**
```bash
cd backend
npm test
```

### **Frontend Testing**
- Manual testing on multiple devices
- Cross-browser compatibility
- Performance testing
- Accessibility testing

## 📈 **Performance Optimization**

### **Frontend**
- Lazy loading of images
- Code splitting and bundling
- Service worker caching
- Optimized assets

### **Backend**
- Database indexing
- Query optimization
- Caching strategies
- Load balancing

## 🔧 **Configuration**

### **Environment Variables**
```bash
# Backend
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bikerhub
JWT_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379

# Frontend
API_BASE_URL=http://localhost:5000
```

## 📚 **API Documentation**

### **Authentication Endpoints**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Token verification

### **Product Endpoints**
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### **Order Endpoints**
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/my-orders` - Get user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status

### **User Endpoints**
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password
- `GET /api/users/wishlist` - Get user wishlist

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

- 📧 Email: support@bikerhub.com
- 📖 Documentation: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- 🐛 Issues: [GitHub Issues](https://github.com/Tson28/biker--shop/issues)

## 🎯 **Roadmap**

### **Phase 1 (Current)**
- ✅ Basic e-commerce functionality
- ✅ User authentication system
- ✅ Admin dashboard
- ✅ User profile system
- ✅ Product management

### **Phase 2 (Next)**
- 🔄 Advanced payment integration
- 🔄 Real-time chat support
- 🔄 Advanced analytics
- 🔄 Mobile app development
- 🔄 Multi-language support

### **Phase 3 (Future)**
- 📋 AI-powered recommendations
- 📋 Advanced inventory management
- 📋 Supplier management system
- 📋 Advanced reporting tools
- 📋 Integration with external services

---

**Made with ❤️ by the BikerHUB Team**

*Transform your cycling business with the most advanced e-commerce platform for bicycle enthusiasts!*

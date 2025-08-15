// ===== BIKERHUB ENHANCED JAVASCRIPT =====
// Advanced JavaScript with modern features and optimizations

class BikerHUB {
    constructor() {
        this.cart = [];
        this.user = null;
        this.products = [];
        this.orders = [];
        this.wishlist = [];
        this.notifications = [];
        this.isLoading = false;
        this.searchTimeout = null;
        this.animationObserver = null;
        this.parallaxElements = [];
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.checkAuth();
        this.setupAnimations();
        this.setupSearch();
        this.setupNotifications();
        this.setupParallax();
        this.setupIntersectionObserver();
        this.setupKeyboardShortcuts();
        this.setupServiceWorker();
        this.setupPerformanceMonitoring();
    }

    // Enhanced Data Management
    loadData() {
        try {
            this.cart = JSON.parse(localStorage.getItem('bikerhub_cart')) || [];
            this.user = JSON.parse(localStorage.getItem('bikerhub_user')) || null;
            this.products = JSON.parse(localStorage.getItem('bikerhub_products')) || this.getDefaultProducts();
            this.orders = JSON.parse(localStorage.getItem('bikerhub_orders')) || [];
            this.wishlist = JSON.parse(localStorage.getItem('bikerhub_wishlist')) || [];
        } catch (error) {
            console.error('Error loading data:', error);
            this.showNotification('Error loading data. Starting fresh.', 'error');
        }
        this.updateUI();
    }

    saveData() {
        try {
            localStorage.setItem('bikerhub_cart', JSON.stringify(this.cart));
            localStorage.setItem('bikerhub_user', JSON.stringify(this.user));
            localStorage.setItem('bikerhub_products', JSON.stringify(this.products));
            localStorage.setItem('bikerhub_orders', JSON.stringify(this.orders));
            localStorage.setItem('bikerhub_wishlist', JSON.stringify(this.wishlist));
        } catch (error) {
            console.error('Error saving data:', error);
            this.showNotification('Error saving data.', 'error');
        }
    }

    // Enhanced Product Management
    getDefaultProducts() {
        return [
            {
                id: 1,
                name: "Mountain Bike Pro X1",
                brand: "Trek",
                category: "mountain",
                price: 1299.99,
                description: "Professional mountain bike with advanced suspension and premium components. Perfect for off-road adventures and competitive racing.",
                images: [
                    { url: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500&h=400&fit=crop", alt: "Mountain Bike Pro X1", isPrimary: true },
                    { url: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500&h=400&fit=crop", alt: "Mountain Bike Pro X1 Side View" }
                ],
                stock: { quantity: 15, lowStockThreshold: 5 },
                rating: 4.8,
                reviews: 127,
                features: ["Full Suspension", "Hydraulic Disc Brakes", "27.5\" Wheels", "Carbon Frame"],
                specifications: {
                    frame: "Carbon Fiber",
                    weight: "12.5 kg",
                    gears: "21 Speed",
                    brakes: "Hydraulic Disc"
                },
                location: "San Francisco, CA",
                condition: "New",
                year: 2024,
                color: "Matte Black",
                size: "Large",
                tags: ["mountain", "professional", "carbon", "suspension"]
            },
            {
                id: 2,
                name: "Road Bike Speed Master",
                brand: "Specialized",
                category: "road",
                price: 899.99,
                description: "Lightweight road bike designed for speed and efficiency. Ideal for road racing and long-distance cycling.",
                images: [
                    { url: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&h=400&fit=crop", alt: "Road Bike Speed Master", isPrimary: true },
                    { url: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&h=400&fit=crop", alt: "Road Bike Speed Master Side View" }
                ],
                stock: { quantity: 8, lowStockThreshold: 5 },
                rating: 4.6,
                reviews: 89,
                features: ["Lightweight Frame", "Drop Handlebars", "Thin Tires", "Aero Design"],
                specifications: {
                    frame: "Aluminum",
                    weight: "8.2 kg",
                    gears: "18 Speed",
                    brakes: "Rim Brakes"
                },
                location: "New York, NY",
                condition: "New",
                year: 2024,
                color: "Racing Red",
                size: "Medium",
                tags: ["road", "racing", "lightweight", "aero"]
            },
            {
                id: 3,
                name: "Electric Bike E-Cruiser",
                brand: "Giant",
                category: "electric",
                price: 2499.99,
                description: "Modern electric bike with powerful motor and long battery life. Perfect for commuting and city riding.",
                images: [
                    { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop", alt: "Electric Bike E-Cruiser", isPrimary: true },
                    { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop", alt: "Electric Bike E-Cruiser Side View" }
                ],
                stock: { quantity: 12, lowStockThreshold: 5 },
                rating: 4.9,
                reviews: 203,
                features: ["Electric Motor", "Long Battery Life", "LED Display", "USB Charging"],
                specifications: {
                    frame: "Aluminum",
                    weight: "22.0 kg",
                    motor: "500W",
                    battery: "48V 13Ah",
                    range: "80 km"
                },
                location: "Los Angeles, CA",
                condition: "New",
                year: 2024,
                color: "Electric Blue",
                size: "Large",
                tags: ["electric", "commuting", "eco-friendly", "modern"]
            },
            {
                id: 4,
                name: "BMX Freestyle Pro",
                brand: "Haro",
                category: "bmx",
                price: 449.99,
                description: "Professional BMX bike built for tricks and stunts. Durable construction for extreme riding.",
                images: [
                    { url: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500&h=400&fit=crop", alt: "BMX Freestyle Pro", isPrimary: true },
                    { url: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500&h=400&fit=crop", alt: "BMX Freestyle Pro Side View" }
                ],
                stock: { quantity: 25, lowStockThreshold: 5 },
                rating: 4.7,
                reviews: 156,
                features: ["Strong Frame", "Pegs Ready", "20\" Wheels", "Freewheel Hub"],
                specifications: {
                    frame: "Steel",
                    weight: "11.8 kg",
                    wheels: "20\"",
                    brakes: "U-Brake"
                },
                location: "Miami, FL",
                condition: "New",
                year: 2024,
                color: "Neon Green",
                size: "One Size",
                tags: ["bmx", "freestyle", "tricks", "durable"]
            },
            {
                id: 5,
                name: "Hybrid City Commuter",
                brand: "Cannondale",
                category: "hybrid",
                price: 699.99,
                description: "Versatile hybrid bike perfect for city commuting and weekend adventures. Comfortable riding position.",
                images: [
                    { url: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&h=400&fit=crop", alt: "Hybrid City Commuter", isPrimary: true },
                    { url: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&h=400&fit=crop", alt: "Hybrid City Commuter Side View" }
                ],
                stock: { quantity: 18, lowStockThreshold: 5 },
                rating: 4.5,
                reviews: 94,
                features: ["Upright Position", "Fenders", "Rack Mounts", "Comfortable Saddle"],
                specifications: {
                    frame: "Aluminum",
                    weight: "13.2 kg",
                    gears: "24 Speed",
                    brakes: "V-Brakes"
                },
                location: "Chicago, IL",
                condition: "New",
                year: 2024,
                color: "Metallic Silver",
                size: "Medium",
                tags: ["hybrid", "commuting", "comfortable", "versatile"]
            },
            {
                id: 6,
                name: "Kids Balance Bike",
                brand: "Strider",
                category: "kids",
                price: 129.99,
                description: "Perfect first bike for toddlers. No pedals, no training wheels - just pure balance learning fun.",
                images: [
                    { url: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500&h=400&fit=crop", alt: "Kids Balance Bike", isPrimary: true },
                    { url: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500&h=400&fit=crop", alt: "Kids Balance Bike Side View" }
                ],
                stock: { quantity: 30, lowStockThreshold: 5 },
                rating: 4.9,
                reviews: 312,
                features: ["No Pedals", "Lightweight", "Adjustable Seat", "Safety Grips"],
                specifications: {
                    frame: "Steel",
                    weight: "3.1 kg",
                    wheels: "12\"",
                    age: "2-5 years"
                },
                location: "Seattle, WA",
                condition: "New",
                year: 2024,
                color: "Bright Yellow",
                size: "12\"",
                tags: ["kids", "balance", "learning", "safe"]
            }
        ];
    }

    // Enhanced Authentication
    checkAuth() {
        const token = localStorage.getItem('bikerhub_token');
        if (token && this.user) {
            this.updateUserUI();
            if (this.isAdmin()) {
                this.showAdminPanel();
            }
        } else {
            this.updateUserUI();
        }
    }

    login(username, password) {
        // Simulate authentication
        if (username === 'admin' && password === 'admin123') {
            this.user = {
                id: 1,
                username: 'admin',
                email: 'admin@bikerhub.com',
                role: 'admin',
                firstName: 'Admin',
                lastName: 'User'
            };
            localStorage.setItem('bikerhub_token', 'admin-token-123');
            this.saveData();
            this.updateUserUI();
            this.showNotification('Welcome back, Admin!', 'success');
            return true;
        } else if (username === 'user' && password === 'user123') {
            this.user = {
                id: 2,
                username: 'user',
                email: 'user@bikerhub.com',
                role: 'user',
                firstName: 'Regular',
                lastName: 'User'
            };
            localStorage.setItem('bikerhub_token', 'user-token-456');
            this.saveData();
            this.updateUserUI();
            this.showNotification('Welcome back, User!', 'success');
            return true;
        }
        return false;
    }

    logout() {
        this.user = null;
        localStorage.removeItem('bikerhub_token');
        this.saveData();
        this.updateUserUI();
        this.hideAdminPanel();
        this.showNotification('Logged out successfully', 'info');
    }

    generateToken() {
        return Math.random().toString(36).substr(2, 9);
    }

    isAdmin() {
        return this.user && this.user.role === 'admin';
    }

    // Enhanced Cart Management
    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.images.find(img => img.isPrimary)?.url || product.images[0]?.url,
                quantity: quantity
            });
        }

        this.saveData();
        this.updateCartUI();
        this.showNotification(`${product.name} added to cart!`, 'success');
        this.animateCartIcon();
        return true;
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveData();
        this.updateCartUI();
        this.showNotification('Item removed from cart', 'info');
    }

    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveData();
                this.updateCartUI();
            }
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    clearCart() {
        this.cart = [];
        this.saveData();
        this.updateCartUI();
        this.showNotification('Cart cleared', 'info');
    }

    // Enhanced Search and Filtering
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => {
                    this.performSearch(e.target.value);
                }, 300);
            });
        }
    }

    performSearch(query) {
        if (!query.trim()) {
            this.displayProducts(this.products);
            return;
        }

        const results = this.products.filter(product => {
            const searchTerm = query.toLowerCase();
            return (
                product.name.toLowerCase().includes(searchTerm) ||
                product.brand.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.features.some(feature => feature.toLowerCase().includes(searchTerm))
            );
        });

        this.displayProducts(results);
        this.showNotification(`Found ${results.length} products for "${query}"`, 'info');
    }

    filterProducts(category) {
        const filteredProducts = category === 'all' 
            ? this.products 
            : this.products.filter(product => product.category === category);
        
        this.displayProducts(filteredProducts);
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        this.showNotification(`${filteredProducts.length} products in ${category} category`, 'info');
    }

    sortProducts(criteria) {
        let sortedProducts = [...this.products];
        
        switch (criteria) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                sortedProducts.sort((a, b) => b.year - a.year);
                break;
            case 'name':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        
        this.displayProducts(sortedProducts);
        this.showNotification(`Products sorted by ${criteria}`, 'info');
    }

    // Enhanced Product Display
    displayProducts(products = this.products) {
        const container = document.getElementById('productsContainer');
        if (!container) return;

        container.innerHTML = '';
        
        if (products.length === 0) {
            container.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search" style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        products.forEach(product => {
            const productCard = this.createProductCard(product);
            container.appendChild(productCard);
        });

        // Animate products in
        this.animateProductsIn();
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card animate-in';
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.images.find(img => img.isPrimary)?.url || product.images[0]?.url}" 
                     alt="${product.name}" 
                     class="product-image"
                     loading="lazy">
                <div class="product-overlay">
                    <button class="btn-quick-view" onclick="bikerhub.quickView(${product.id})">
                        <i class="fas fa-eye"></i> Quick View
                    </button>
                </div>
                <div class="stock-badge ${product.stock.quantity > 0 ? 'in-stock' : 'out-of-stock'}">
                    ${product.stock.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </div>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${this.generateStars(product.rating)}
                    </div>
                    <span class="rating-text">${product.rating} (${product.reviews})</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    ${product.features.slice(0, 3).map(feature => 
                        `<span class="feature-tag">${feature}</span>`
                    ).join('')}
                </div>
                <div class="product-price">$${this.formatPrice(product.price)}</div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="bikerhub.addToCart(${product.id})" 
                            ${product.stock.quantity === 0 ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="bikerhub.addToWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star" style="color: #ffd700;"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt" style="color: #ffd700;"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="fas fa-star" style="color: #e2e8f0;"></i>';
        }
        return stars;
    }

    // Enhanced Quick View
    quickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="quick-view-content">
                    <div class="quick-view-image">
                        <img src="${product.images.find(img => img.isPrimary)?.url || product.images[0]?.url}" 
                             alt="${product.name}">
                    </div>
                    <div class="quick-view-details">
                        <h2>${product.name}</h2>
                        <div class="product-meta">
                            <span>${product.brand}</span>
                            <span>${product.category}</span>
                            <span>${product.year}</span>
                            <span>${product.condition}</span>
                        </div>
                        <p>${product.description}</p>
                        <div class="product-features">
                            ${product.features.map(feature => 
                                `<span class="feature-tag">${feature}</span>`
                            ).join('')}
                        </div>
                        <div class="product-price">$${this.formatPrice(product.price)}</div>
                        <div class="product-actions">
                            <button class="btn btn-primary" onclick="bikerhub.addToCart(${product.id})" 
                                    ${product.stock.quantity === 0 ? 'disabled' : ''}>
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button class="btn btn-secondary" onclick="bikerhub.addToWishlist(${product.id})">
                                <i class="fas fa-heart"></i> Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.animation = 'fadeIn 0.3s ease-out';
        
        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    // Enhanced Wishlist
    addToWishlist(productId) {
        if (this.wishlist.includes(productId)) {
            this.wishlist = this.wishlist.filter(id => id !== productId);
            this.showNotification('Removed from wishlist', 'info');
        } else {
            this.wishlist.push(productId);
            this.showNotification('Added to wishlist', 'success');
        }
        this.saveData();
        this.updateWishlistUI();
    }

    updateWishlistUI() {
        // Update wishlist buttons
        document.querySelectorAll('.btn-secondary').forEach(btn => {
            if (btn.onclick && btn.onclick.toString().includes('addToWishlist')) {
                const productId = parseInt(btn.onclick.toString().match(/\d+/)[0]);
                if (this.wishlist.includes(productId)) {
                    btn.innerHTML = '<i class="fas fa-heart" style="color: #ef4444;"></i>';
                    btn.classList.add('wishlisted');
                } else {
                    btn.innerHTML = '<i class="fas fa-heart"></i>';
                    btn.classList.remove('wishlisted');
                }
            }
        });
    }

    // Enhanced Order Management
    createOrder() {
        if (this.cart.length === 0) {
            this.showNotification('Cart is empty', 'warning');
            return;
        }

        const order = {
            id: Date.now(),
            orderNumber: `BH${Date.now()}`,
            customer: this.user ? this.user.username : 'Guest',
            items: [...this.cart],
            status: 'pending',
            total: this.getCartTotal(),
            date: new Date().toISOString(),
            shippingAddress: {
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                zip: '12345',
                country: 'USA'
            }
        };

        this.orders.push(order);
        this.cart = [];
        this.saveData();
        this.updateCartUI();
        this.showNotification('Order created successfully!', 'success');
        
        // Redirect to orders page
        if (window.location.pathname.includes('checkout.html')) {
            window.location.href = 'orders.html';
        }
    }

    // Enhanced Notifications
    setupNotifications() {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.id = 'notificationContainer';
        document.body.appendChild(container);
    }

    showNotification(message, type = 'info', duration = 5000) {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        container.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    }

    // Enhanced UI Updates
    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.style.animation = 'scaleIn 0.3s ease-out';
        }
    }

    updateUserUI() {
        const userInfo = document.getElementById('userInfo');
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (userInfo) {
            if (this.user) {
                userInfo.innerHTML = `<i class="fas fa-user"></i> ${this.user.firstName}`;
                if (logoutBtn) logoutBtn.style.display = 'inline-block';
            } else {
                userInfo.innerHTML = '<a href="login.html"><i class="fas fa-sign-in-alt"></i> Login</a>';
                if (logoutBtn) logoutBtn.style.display = 'none';
            }
        }
    }

    updateProductCount() {
        const productCount = document.getElementById('productCount');
        if (productCount) {
            productCount.textContent = this.products.length;
        }
    }

    // Enhanced Animations
    setupAnimations() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Parallax effect for hero sections
        this.setupParallax();
    }

    setupParallax() {
        this.parallaxElements = document.querySelectorAll('.parallax');
        if (this.parallaxElements.length > 0) {
            window.addEventListener('scroll', () => {
                this.parallaxElements.forEach(element => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * -0.5;
                    element.style.transform = `translateY(${rate}px)`;
                });
            });
        }
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, options);

        // Observe all elements that should animate
        document.querySelectorAll('.product-card, .feature-card, .card').forEach(el => {
            this.animationObserver.observe(el);
        });
    }

    animateProductsIn() {
        const products = document.querySelectorAll('.product-card');
        products.forEach((product, index) => {
            setTimeout(() => {
                product.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
            }, index * 100);
        });
    }

    animateCartIcon() {
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.style.animation = 'scaleIn 0.3s ease-out';
            setTimeout(() => {
                cartIcon.style.animation = '';
            }, 300);
        }
    }

    // Enhanced Event Listeners
    setupEventListeners() {
        // Global click handler
        document.addEventListener('click', (e) => {
            // Handle cart icon click
            if (e.target.closest('.cart-icon')) {
                this.openCart();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Handle scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Handle keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.quick-view-modal');
                modals.forEach(modal => modal.remove());
            }
        });
    }

    handleResize() {
        // Update layout on resize
        this.updateLayout();
    }

    handleScroll() {
        // Update navbar on scroll
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    updateLayout() {
        // Responsive layout updates
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('mobile', isMobile);
    }

    // Enhanced Cart Modal
    openCart() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty', 'info');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="quick-view-content">
                    <h2><i class="fas fa-shopping-cart"></i> Shopping Cart</h2>
                    <div class="cart-items">
                        ${this.cart.map(item => `
                            <div class="cart-item">
                                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                                <div class="cart-item-details">
                                    <h4>${item.name}</h4>
                                    <p>$${this.formatPrice(item.price)}</p>
                                </div>
                                <div class="cart-item-quantity">
                                    <button onclick="bikerhub.updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="bikerhub.updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                </div>
                                <button onclick="bikerhub.removeFromCart(${item.id})" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <div class="cart-total">
                        <h3>Total: $${this.formatPrice(this.getCartTotal())}</h3>
                    </div>
                    <div class="cart-actions">
                        <button onclick="bikerhub.clearCart()" class="btn btn-secondary">
                            <i class="fas fa-trash"></i> Clear Cart
                        </button>
                        <button onclick="bikerhub.createOrder()" class="btn btn-primary">
                            <i class="fas fa-checkout"></i> Checkout
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.animation = 'fadeIn 0.3s ease-out';
    }

    // Enhanced Admin Panel
    showAdminPanel() {
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) {
            adminPanel.style.display = 'block';
            adminPanel.style.animation = 'slideInRight 0.5s ease-out';
        }
    }

    hideAdminPanel() {
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) {
            adminPanel.style.display = 'none';
        }
    }

    showAllUsers() {
        const users = [
            { username: 'admin', role: 'admin', email: 'admin@bikerhub.com' },
            { username: 'user', role: 'user', email: 'user@bikerhub.com' },
            { username: 'moderator', role: 'moderator', email: 'mod@bikerhub.com' }
        ];
        
        this.showNotification(`Found ${users.length} users`, 'info');
        console.log('Users:', users);
    }

    showAllOrders() {
        this.showNotification(`Found ${this.orders.length} orders`, 'info');
        console.log('Orders:', this.orders);
    }

    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            localStorage.clear();
            location.reload();
        }
    }

    toggleAdminPanel() {
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) {
            if (adminPanel.style.display === 'block') {
                this.hideAdminPanel();
            } else {
                this.showAdminPanel();
            }
        }
    }

    // Enhanced Utility Functions
    formatPrice(price) {
        return price.toFixed(2);
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Enhanced Performance Monitoring
    setupPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }
        });

        // Monitor scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Log scroll performance metrics
                console.log('Scroll Performance:', performance.now());
            }, 100);
        });
    }

    // Enhanced Service Worker Setup
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    // Enhanced Error Handling
    handleError(error, context = '') {
        console.error(`Error in ${context}:`, error);
        this.showNotification(`An error occurred: ${error.message}`, 'error');
        
        // Log error to analytics service (if available)
        if (window.gtag) {
            window.gtag('event', 'exception', {
                description: error.message,
                fatal: false
            });
        }
    }

    // Enhanced Data Validation
    validateProduct(product) {
        const required = ['name', 'price', 'category', 'description'];
        const missing = required.filter(field => !product[field]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }
        
        if (product.price < 0) {
            throw new Error('Price cannot be negative');
        }
        
        if (product.stock && product.stock.quantity < 0) {
            throw new Error('Stock quantity cannot be negative');
        }
        
        return true;
    }

    // Enhanced Search Analytics
    trackSearch(query, results) {
        if (window.gtag) {
            window.gtag('event', 'search', {
                search_term: query,
                results_count: results.length
            });
        }
    }

    // Enhanced User Analytics
    trackUserAction(action, details = {}) {
        if (window.gtag) {
            window.gtag('event', action, details);
        }
    }
}

// Enhanced Utility Functions
const utils = {
    // Enhanced DOM manipulation
    createElement(tag, className, innerHTML) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    },

    // Enhanced event handling
    addEventListeners(element, events) {
        Object.entries(events).forEach(([event, handler]) => {
            element.addEventListener(event, handler);
        });
    },

    // Enhanced data storage
    storage: {
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return defaultValue;
            }
        },

        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('Error writing to localStorage:', error);
                return false;
            }
        },

        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error('Error removing from localStorage:', error);
                return false;
            }
        }
    },

    // Enhanced validation
    validation: {
        email(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        password(password) {
            return password.length >= 6;
        },

        phone(phone) {
            const re = /^[\+]?[1-9][\d]{0,15}$/;
            return re.test(phone.replace(/[\s\-\(\)]/g, ''));
        }
    },

    // Enhanced formatting
    format: {
        currency(amount, currency = 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency
            }).format(amount);
        },

        date(date, options = {}) {
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                ...options
            }).format(new Date(date));
        },

        number(num, options = {}) {
            return new Intl.NumberFormat('en-US', options).format(num);
        }
    },

    // Enhanced animations
    animation: {
        fadeIn(element, duration = 300) {
            element.style.opacity = '0';
            element.style.transition = `opacity ${duration}ms ease-in-out`;
            element.style.opacity = '1';
        },

        slideDown(element, duration = 300) {
            element.style.height = '0';
            element.style.overflow = 'hidden';
            element.style.transition = `height ${duration}ms ease-in-out`;
            element.style.height = element.scrollHeight + 'px';
        },

        slideUp(element, duration = 300) {
            element.style.height = element.scrollHeight + 'px';
            element.style.overflow = 'hidden';
            element.style.transition = `height ${duration}ms ease-in-out`;
            element.style.height = '0';
        }
    }
};

// Initialize BikerHUB when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.bikerhub = BikerHUB.getInstance();
    
    // Add loading state
    document.body.classList.add('loaded');
    
    // Track page view
    if (window.gtag) {
        window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
});

// Enhanced error handling for unhandled errors
window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
    if (window.bikerhub) {
        window.bikerhub.handleError(event.error, 'Global Error Handler');
    }
});

// Enhanced unhandled promise rejection handling
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    if (window.bikerhub) {
        window.bikerhub.handleError(new Error(event.reason), 'Promise Rejection');
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BikerHUB, utils };
}


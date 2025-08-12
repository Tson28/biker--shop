// ===== BIKERHUB ENHANCED SCRIPT =====
// Advanced JavaScript functionality for BikerHUB

class BikerHUBEnhanced {
    constructor() {
        this.cart = [];
        this.user = null;
        this.products = [];
        this.orders = [];
        this.wishlist = [];
        this.searchHistory = [];
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.checkAuth();
        this.setupAnimations();
        this.setupSearch();
        this.setupNotifications();
        this.setupLazyLoading();
        this.setupIntersectionObserver();
        this.setupKeyboardShortcuts();
        this.setupServiceWorker();
    }

    // Enhanced Data Management
    loadData() {
        try {
            this.cart = JSON.parse(localStorage.getItem('cart')) || [];
            this.products = JSON.parse(localStorage.getItem('products')) || this.getDefaultProducts();
            this.orders = JSON.parse(localStorage.getItem('orders')) || [];
            this.user = JSON.parse(localStorage.getItem('user')) || null;
            this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            this.searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        } catch (error) {
            console.error('Error loading data:', error);
            this.resetData();
        }
    }

    saveData() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.cart));
            localStorage.setItem('products', JSON.stringify(this.products));
            localStorage.setItem('orders', JSON.stringify(this.orders));
            localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
            if (this.user) {
                localStorage.setItem('user', JSON.stringify(this.user));
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    resetData() {
        this.cart = [];
        this.products = this.getDefaultProducts();
        this.orders = [];
        this.user = null;
        this.wishlist = [];
        this.searchHistory = [];
        this.saveData();
    }

    // Enhanced Default Products
    getDefaultProducts() {
        return [
            {
                id: 1,
                name: "Trek Marlin 7 Mountain Bike",
                description: "Perfect for trail riding with 21-speed Shimano drivetrain and hydraulic disc brakes. Ideal for both beginners and experienced riders.",
                price: 699.99,
                image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop",
                category: "mountain",
                brand: "Trek",
                year: 2023,
                condition: "new",
                rating: 4.8,
                reviews: 127,
                inStock: true,
                colors: ["Black", "Blue", "Red"],
                features: ["21-speed", "Hydraulic brakes", "Suspension fork", "Lightweight frame"],
                specifications: {
                    frame: "Aluminum",
                    weight: "12.5 kg",
                    wheelSize: "29\"",
                    gears: "21"
                }
            },
            {
                id: 2,
                name: "Specialized Allez Road Bike",
                description: "Lightweight aluminum frame with carbon fork for smooth road performance. Perfect for racing and long-distance rides.",
                price: 899.99,
                image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa5?w=400&h=300&fit=crop",
                category: "road",
                brand: "Specialized",
                year: 2023,
                condition: "new",
                rating: 4.9,
                reviews: 89,
                inStock: true,
                colors: ["White", "Black", "Silver"],
                features: ["Aluminum frame", "Carbon fork", "Racing geometry", "Aero design"],
                specifications: {
                    frame: "Aluminum",
                    weight: "8.2 kg",
                    wheelSize: "700c",
                    gears: "22"
                }
            },
            {
                id: 3,
                name: "Rad Power RadCity Electric Bike",
                description: "Electric assist with 45-mile range, perfect for commuting and city riding. Includes integrated lights and fenders.",
                price: 1499.99,
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
                category: "electric",
                brand: "Rad Power",
                year: 2023,
                condition: "new",
                rating: 4.7,
                reviews: 203,
                inStock: true,
                colors: ["Black", "White"],
                features: ["Electric assist", "45-mile range", "LED lights", "Integrated fenders"],
                specifications: {
                    frame: "Aluminum",
                    weight: "25.5 kg",
                    wheelSize: "26\"",
                    battery: "48V 14Ah"
                }
            },
            {
                id: 4,
                name: "Giant Defy Advanced Pro 1",
                description: "Carbon fiber endurance road bike with electronic shifting. Designed for comfort on long rides.",
                price: 3499.99,
                image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=400&h=300&fit=crop",
                category: "road",
                brand: "Giant",
                year: 2023,
                condition: "new",
                rating: 4.9,
                reviews: 156,
                inStock: true,
                colors: ["Carbon Black", "Team Blue"],
                features: ["Carbon frame", "Electronic shifting", "Endurance geometry", "Disc brakes"],
                specifications: {
                    frame: "Carbon Fiber",
                    weight: "7.8 kg",
                    wheelSize: "700c",
                    gears: "22"
                }
            },
            {
                id: 5,
                name: "Santa Cruz Hightower Carbon C",
                description: "Premium mountain bike with carbon frame and advanced suspension. Built for aggressive trail riding.",
                price: 4299.99,
                image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop",
                category: "mountain",
                brand: "Santa Cruz",
                year: 2023,
                condition: "new",
                rating: 4.8,
                reviews: 89,
                inStock: true,
                colors: ["Carbon Black", "Forest Green"],
                features: ["Carbon frame", "Advanced suspension", "29\" wheels", "Premium components"],
                specifications: {
                    frame: "Carbon Fiber",
                    weight: "13.2 kg",
                    wheelSize: "29\"",
                    gears: "12"
                }
            }
        ];
    }

    // Enhanced Authentication
    checkAuth() {
        const token = localStorage.getItem('authToken');
        if (token && this.validateToken(token)) {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.updateUI();
        } else {
            this.logout();
        }
    }

    validateToken(token) {
        // Simple token validation - in production, use JWT
        return token && token.length > 20;
    }

    login(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || this.getDefaultUsers();
        const user = users.find(u => 
            (u.username === username || u.email === username) && u.password === password
        );
        
        if (user) {
            this.user = user;
            const token = this.generateToken();
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            this.saveData();
            this.showNotification('Login successful!', 'success');
            this.trackEvent('user_login', { username: user.username });
            return true;
        }
        return false;
    }

    logout() {
        this.user = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        this.showNotification('Logged out successfully', 'info');
        this.updateUI();
        this.trackEvent('user_logout');
    }

    generateToken() {
        return Math.random().toString(36).substr(2) + Date.now().toString(36);
    }

    getDefaultUsers() {
        return [
            {
                id: 1,
                username: 'admin',
                email: 'admin@bikerhub.com',
                password: 'admin123',
                role: 'admin',
                firstName: 'Admin',
                lastName: 'User',
                joinDate: '2024-01-01'
            },
            {
                id: 2,
                username: 'demo',
                email: 'demo@bikerhub.com',
                password: 'demo123',
                role: 'user',
                firstName: 'Demo',
                lastName: 'User',
                joinDate: '2024-01-01'
            }
        ];
    }

    // Enhanced Cart Management
    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return false;

        if (!product.inStock) {
            this.showNotification('Product is out of stock', 'warning');
            return false;
        }

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ ...product, quantity });
        }

        this.saveData();
        this.updateCartUI();
        this.showNotification(`${product.name} added to cart!`, 'success');
        this.trackEvent('add_to_cart', { productId, productName: product.name });
        return true;
    }

    removeFromCart(productId) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            this.cart = this.cart.filter(item => item.id !== productId);
            this.saveData();
            this.updateCartUI();
            this.showNotification(`${item.name} removed from cart`, 'info');
            this.trackEvent('remove_from_cart', { productId, productName: item.name });
        }
    }

    updateCartQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveData();
            this.updateCartUI();
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartItemCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    clearCart() {
        this.cart = [];
        this.saveData();
        this.updateCartUI();
        this.showNotification('Cart cleared', 'info');
        this.trackEvent('clear_cart');
    }

    // Enhanced Search and Filter
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            const debouncedSearch = this.debounce((query) => {
                this.performSearch(query);
            }, 300);

            searchInput.addEventListener('input', (e) => {
                debouncedSearch(e.target.value);
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                }
            });
        }
    }

    performSearch(query) {
        if (!query.trim()) {
            this.displayProducts(this.products);
            return;
        }

        // Add to search history
        if (!this.searchHistory.includes(query)) {
            this.searchHistory.unshift(query);
            this.searchHistory = this.searchHistory.slice(0, 10); // Keep last 10 searches
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        }

        const results = this.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.features.some(f => f.toLowerCase().includes(query.toLowerCase()))
        );

        this.displayProducts(results);
        this.trackEvent('search', { query, resultsCount: results.length });
    }

    filterProducts(category) {
        const filtered = category === 'all' ? 
            this.products : this.products.filter(p => p.category === category);
        this.displayProducts(filtered);
        this.trackEvent('filter_products', { category });
    }

    sortProducts(criteria) {
        let sorted = [...this.products];
        
        switch(criteria) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                sorted.sort((a, b) => b.year - a.year);
                break;
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'popularity':
                sorted.sort((a, b) => b.reviews - a.reviews);
                break;
        }

        this.displayProducts(sorted);
        this.trackEvent('sort_products', { criteria });
    }

    // Enhanced Product Display
    displayProducts(products) {
        const container = document.getElementById('productsGrid');
        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search criteria or browse all products.</p>
                    <button class="btn btn-primary" onclick="bikerhub.displayProducts(bikerhub.products)">
                        <i class="fas fa-bicycle"></i> View All Products
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = products.map(product => this.createProductCard(product)).join('');
        
        // Setup lazy loading for images
        this.setupLazyLoading();
    }

    createProductCard(product) {
        const stockStatus = product.inStock ? 
            '<span class="stock-badge in-stock">In Stock</span>' : 
            '<span class="stock-badge out-of-stock">Out of Stock</span>';

        const discount = product.originalPrice ? 
            `<div class="discount-badge">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</div>` : '';

        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                    ${stockStatus}
                    ${discount}
                    <div class="product-overlay">
                        <button class="btn-quick-view" onclick="bikerhub.quickView(${product.id})">
                            <i class="fas fa-eye"></i> Quick View
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <div class="product-title">${product.name}</div>
                    <div class="product-rating">
                        ${this.generateStars(product.rating)} 
                        <span class="rating-text">(${product.reviews})</span>
                    </div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-features">
                        ${product.features.slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('')}
                    </div>
                    <div class="product-price">
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="bikerhub.addToCart(${product.id})" 
                                ${!product.inStock ? 'disabled' : ''}>
                            ${product.inStock ? '<i class="fas fa-shopping-cart"></i> Add to Cart' : 'Out of Stock'}
                        </button>
                        <button class="btn btn-secondary" onclick="bikerhub.toggleWishlist(${product.id})" 
                                class="${this.wishlist.includes(product.id) ? 'active' : ''}">
                            <i class="fas fa-heart"></i> Wishlist
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '<i class="fas fa-star"></i>'.repeat(fullStars);
        if (hasHalfStar) stars += '<i class="fas fa-star-half-alt"></i>';
        const emptyStars = 5 - Math.ceil(rating);
        stars += '<i class="far fa-star"></i>'.repeat(emptyStars);
        return stars;
    }

    // Enhanced Quick View Modal
    quickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">×</button>
                <div class="quick-view-content">
                    <div class="quick-view-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="quick-view-details">
                        <h2>${product.name}</h2>
                        <div class="product-meta">
                            <span class="brand">${product.brand}</span>
                            <span class="year">${product.year}</span>
                            <span class="condition">${product.condition}</span>
                        </div>
                        <div class="rating">${this.generateStars(product.rating)} (${product.reviews} reviews)</div>
                        <p class="description">${product.description}</p>
                        <div class="specifications">
                            <h4>Specifications:</h4>
                            <div class="spec-grid">
                                ${Object.entries(product.specifications || {}).map(([key, value]) => 
                                    `<div class="spec-item"><strong>${key}:</strong> ${value}</div>`
                                ).join('')}
                            </div>
                        </div>
                        <div class="features">
                            <h4>Features:</h4>
                            <ul>${product.features.map(f => `<li>${f}</li>`).join('')}</ul>
                        </div>
                        <div class="price">$${product.price.toFixed(2)}</div>
                        <div class="actions">
                            <button class="btn btn-primary" onclick="bikerhub.addToCart(${product.id})">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button class="btn btn-secondary" onclick="bikerhub.toggleWishlist(${product.id})">
                                <i class="fas fa-heart"></i> Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.trackEvent('quick_view', { productId, productName: product.name });
    }

    // Enhanced Wishlist Management
    toggleWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.showNotification('Removed from wishlist', 'info');
        } else {
            this.wishlist.push(productId);
            this.showNotification('Added to wishlist!', 'success');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistUI();
        this.trackEvent('toggle_wishlist', { productId, action: index > -1 ? 'remove' : 'add' });
    }

    updateWishlistUI() {
        document.querySelectorAll('[onclick*="toggleWishlist"]').forEach(btn => {
            const productId = parseInt(btn.onclick.toString().match(/\d+/)[0]);
            if (this.wishlist.includes(productId)) {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '<i class="fas fa-heart"></i> Wishlist';
            }
        });
    }

    // Enhanced Order Management
    createOrder(orderData) {
        const order = {
            id: Date.now(),
            ...orderData,
            status: 'confirmed',
            date: new Date().toISOString(),
            items: this.cart,
            total: this.getCartTotal(),
            trackingNumber: this.generateTrackingNumber()
        };

        this.orders.push(order);
        this.saveData();
        this.clearCart();
        this.showNotification('Order placed successfully!', 'success');
        this.trackEvent('create_order', { orderId: order.id, total: order.total });
        return order;
    }

    generateTrackingNumber() {
        return 'TRK' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
    }

    // Enhanced Notifications System
    setupNotifications() {
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.className = 'notification-container';
        document.body.appendChild(this.notificationContainer);
    }

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        this.notificationContainer.appendChild(notification);

        // Auto remove after duration
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);

        // Add entrance animation
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Track notification
        this.trackEvent('show_notification', { type, message });
    }

    // Enhanced UI Updates
    updateUI() {
        this.updateCartUI();
        this.updateUserUI();
        this.updateProductCount();
        this.updateWishlistUI();
    }

    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.getCartItemCount();
        }
    }

    updateUserUI() {
        const userInfo = document.getElementById('userInfo');
        if (userInfo) {
            if (this.user) {
                userInfo.innerHTML = `
                    Welcome, ${this.user.firstName || this.user.username}
                    ${this.user.role === 'admin' ? '<span class="admin-badge">ADMIN</span>' : ''}
                `;
            } else {
                userInfo.textContent = 'Guest';
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
        this.observeElements();
        this.setupParallax();
        this.setupSmoothScroll();
        this.setupHoverEffects();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.product-card, .feature-card, .order-card').forEach(el => {
            observer.observe(el);
        });
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    setupSmoothScroll() {
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
    }

    setupHoverEffects() {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-12px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Enhanced Lazy Loading
    setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Enhanced Intersection Observer
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, options);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // Enhanced Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) searchInput.focus();
            }
            
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.quick-view-modal');
                modals.forEach(modal => modal.remove());
            }
            
            if (e.ctrlKey && e.key === 'b') {
                e.preventDefault();
                window.location.href = 'bikes.html';
            }
        });
    }

    // Enhanced Service Worker
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        }
    }

    // Enhanced Event Listeners
    setupEventListeners() {
        // Global event delegation
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn-add-to-cart')) {
                const productId = parseInt(e.target.dataset.productId);
                this.addToCart(productId);
            }
        });

        // Window events
        window.addEventListener('beforeunload', () => {
            this.saveData();
        });

        // Resize events
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    handleResize() {
        // Handle responsive behavior
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('mobile', isMobile);
    }

    // Enhanced Utility Functions
    formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Enhanced Analytics
    trackEvent(eventName, data = {}) {
        const event = {
            event: eventName,
            timestamp: new Date().toISOString(),
            userId: this.user?.id || 'guest',
            sessionId: this.getSessionId(),
            ...data
        };

        // In production, send to analytics service
        console.log('Event tracked:', event);
        
        // Store locally for debugging
        const events = JSON.parse(localStorage.getItem('analytics') || '[]');
        events.push(event);
        localStorage.setItem('analytics', JSON.stringify(events.slice(-100))); // Keep last 100 events
    }

    getSessionId() {
        let sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    }

    // Enhanced Admin Functions
    isAdmin() {
        return this.user && this.user.role === 'admin';
    }

    showAdminPanel() {
        if (!this.isAdmin()) return;
        
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) {
            adminPanel.style.display = 'block';
        }
    }

    // Export for global use
    static getInstance() {
        if (!BikerHUBEnhanced.instance) {
            BikerHUBEnhanced.instance = new BikerHUBEnhanced();
        }
        return BikerHUBEnhanced.instance;
    }
}

// Initialize BikerHUB when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.bikerhub = BikerHUBEnhanced.getInstance();
});

// Global utility functions
window.utils = {
    showLoading: (element) => {
        element.innerHTML = '<div class="loading-spinner">Loading...</div>';
    },
    
    hideLoading: (element, content) => {
        element.innerHTML = content;
    },
    
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    validatePhone: (phone) => {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/\s/g, ''));
    },
    
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    formatCurrency: (amount, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BikerHUBEnhanced;
}

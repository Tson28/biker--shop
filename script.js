// ===== BIKERHUB MAIN SCRIPT =====
// Advanced JavaScript functionality for BikerHUB

class BikerHUB {
    constructor() {
        this.cart = [];
        this.user = null;
        this.products = [];
        this.orders = [];
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.checkAuth();
        this.setupAnimations();
        this.setupSearch();
        this.setupNotifications();
    }

    // Data Management
    loadData() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.products = JSON.parse(localStorage.getItem('products')) || this.getDefaultProducts();
        this.orders = JSON.parse(localStorage.getItem('orders')) || [];
        this.user = JSON.parse(localStorage.getItem('user')) || null;
    }

    saveData() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('products', JSON.stringify(this.products));
        localStorage.setItem('orders', JSON.stringify(this.orders));
        if (this.user) {
            localStorage.setItem('user', JSON.stringify(this.user));
        }
    }

    // Default Products
    getDefaultProducts() {
        return [
            {
                id: 1,
                name: "Trek Marlin 7 Mountain Bike",
                description: "Perfect for trail riding with 21-speed Shimano drivetrain and hydraulic disc brakes",
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
                features: ["21-speed", "Hydraulic brakes", "Suspension fork"]
            },
            {
                id: 2,
                name: "Specialized Allez Road Bike",
                description: "Lightweight aluminum frame with carbon fork for smooth road performance",
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
                features: ["Aluminum frame", "Carbon fork", "Racing geometry"]
            },
            {
                id: 3,
                name: "Rad Power RadCity Electric Bike",
                description: "Electric assist with 45-mile range, perfect for commuting and city riding",
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
                features: ["Electric assist", "45-mile range", "LED lights"]
            }
        ];
    }

    // Authentication
    checkAuth() {
        const token = localStorage.getItem('authToken');
        if (token) {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.updateUI();
        }
    }

    login(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
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
    }

    generateToken() {
        return Math.random().toString(36).substr(2) + Date.now().toString(36);
    }

    // Cart Management
    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ ...product, quantity });
        }

        this.saveData();
        this.updateCartUI();
        this.showNotification(`${product.name} added to cart!`, 'success');
        return true;
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveData();
        this.updateCartUI();
        this.showNotification('Item removed from cart', 'info');
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

    clearCart() {
        this.cart = [];
        this.saveData();
        this.updateCartUI();
        this.showNotification('Cart cleared', 'info');
    }

    // Search and Filter
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }
    }

    performSearch(query) {
        if (!query.trim()) {
            this.displayProducts(this.products);
            return;
        }

        const results = this.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        this.displayProducts(results);
    }

    filterProducts(category) {
        const filtered = category === 'all' ? 
            this.products : this.products.filter(p => p.category === category);
        this.displayProducts(filtered);
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
        }

        this.displayProducts(sorted);
    }

    // Product Display
    displayProducts(products) {
        const container = document.getElementById('productsGrid');
        if (!container) return;

        container.innerHTML = products.map(product => this.createProductCard(product)).join('');
    }

    createProductCard(product) {
        const stockStatus = product.inStock ? 
            '<span class="stock-badge in-stock">In Stock</span>' : 
            '<span class="stock-badge out-of-stock">Out of Stock</span>';

        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    ${stockStatus}
                    <div class="product-overlay">
                        <button class="btn-quick-view" onclick="bikerhub.quickView(${product.id})">
                            👁️ Quick View
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
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="bikerhub.addToCart(${product.id})" 
                                ${!product.inStock ? 'disabled' : ''}>
                            ${product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
                        </button>
                        <button class="btn btn-secondary" onclick="bikerhub.addToWishlist(${product.id})">
                            ❤️ Wishlist
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '⭐'.repeat(fullStars);
        if (hasHalfStar) stars += '⭐';
        return stars;
    }

    // Quick View Modal
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
                        <div class="features">
                            <h4>Features:</h4>
                            <ul>${product.features.map(f => `<li>${f}</li>`).join('')}</ul>
                        </div>
                        <div class="price">$${product.price.toFixed(2)}</div>
                        <div class="actions">
                            <button class="btn btn-primary" onclick="bikerhub.addToCart(${product.id})">
                                🛒 Add to Cart
                            </button>
                            <button class="btn btn-secondary" onclick="bikerhub.addToWishlist(${product.id})">
                                ❤️ Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Wishlist Management
    addToWishlist(productId) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!wishlist.includes(productId)) {
            wishlist.push(productId);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            this.showNotification('Added to wishlist!', 'success');
        } else {
            this.showNotification('Already in wishlist!', 'info');
        }
    }

    // Order Management
    createOrder(orderData) {
        const order = {
            id: Date.now(),
            ...orderData,
            status: 'confirmed',
            date: new Date().toISOString(),
            items: this.cart,
            total: this.getCartTotal()
        };

        this.orders.push(order);
        this.saveData();
        this.clearCart();
        this.showNotification('Order placed successfully!', 'success');
        return order;
    }

    // Notifications System
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
    }

    // UI Updates
    updateUI() {
        this.updateCartUI();
        this.updateUserUI();
        this.updateProductCount();
    }

    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.cart.reduce((total, item) => total + item.quantity, 0);
        }
    }

    updateUserUI() {
        const userInfo = document.getElementById('userInfo');
        if (userInfo) {
            if (this.user) {
                userInfo.innerHTML = `
                    Welcome, ${this.user.username}
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

    // Animations
    setupAnimations() {
        this.observeElements();
        this.setupParallax();
        this.setupSmoothScroll();
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

    // Event Listeners
    setupEventListeners() {
        // Global event delegation
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn-add-to-cart')) {
                const productId = parseInt(e.target.dataset.productId);
                this.addToCart(productId);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) searchInput.focus();
            }
        });

        // Window events
        window.addEventListener('beforeunload', () => {
            this.saveData();
        });
    }

    // Utility Functions
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

    // Admin Functions
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
        if (!BikerHUB.instance) {
            BikerHUB.instance = new BikerHUB();
        }
        return BikerHUB.instance;
    }
}

// Initialize BikerHUB when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.bikerhub = BikerHUB.getInstance();
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
    }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BikerHUB;
}

// BikerHUB Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.currentSection = 'dashboard';
        this.products = [];
        this.orders = [];
        this.users = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboardData();
        this.checkAuth();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.switchSection(e.currentTarget.dataset.section);
            });
        });

        // Product form
        document.getElementById('product-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });

        // Search functionality
        document.getElementById('product-search').addEventListener('input', (e) => {
            this.searchProducts(e.target.value);
        });

        document.getElementById('order-search').addEventListener('input', (e) => {
            this.searchOrders(e.target.value);
        });

        document.getElementById('user-search').addEventListener('input', (e) => {
            this.searchUsers(e.target.value);
        });
    }

    checkAuth() {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }
        
        // Verify token with backend
        this.verifyAdminToken(token);
    }

    async verifyAdminToken(token) {
        try {
            const response = await fetch('/api/auth/verify-admin', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Invalid token');
            }
            
            const data = await response.json();
            document.getElementById('admin-name').textContent = data.user.name;
        } catch (error) {
            localStorage.removeItem('adminToken');
            window.location.href = 'login.html';
        }
    }

    switchSection(section) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(el => {
            el.style.display = 'none';
        });

        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
        });

        // Show selected section
        document.getElementById(`${section}-section`).style.display = 'block';
        
        // Add active class to selected nav item
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        
        // Update page title
        document.getElementById('page-title').textContent = this.getSectionTitle(section);
        
        this.currentSection = section;
        
        // Load section-specific data
        this.loadSectionData(section);
    }

    getSectionTitle(section) {
        const titles = {
            'dashboard': 'Dashboard',
            'products': 'Product Management',
            'orders': 'Order Management',
            'users': 'User Management',
            'analytics': 'Analytics & Reports',
            'settings': 'System Settings'
        };
        return titles[section] || 'Dashboard';
    }

    async loadSectionData(section) {
        switch(section) {
            case 'products':
                await this.loadProducts();
                break;
            case 'orders':
                await this.loadOrders();
                break;
            case 'users':
                await this.loadUsers();
                break;
            case 'analytics':
                await this.loadAnalytics();
                break;
        }
    }

    async loadDashboardData() {
        try {
            const [products, orders, users] = await Promise.all([
                this.fetchProducts(),
                this.fetchOrders(),
                this.fetchUsers()
            ]);

            this.updateDashboardStats(products, orders, users);
            this.loadRecentOrders(orders);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            this.showNotification('Error loading dashboard data', 'error');
        }
    }

    updateDashboardStats(products, orders, users) {
        document.getElementById('total-products').textContent = products.length;
        document.getElementById('total-orders').textContent = orders.length;
        document.getElementById('total-users').textContent = users.length;
        
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        document.getElementById('total-revenue').textContent = `$${totalRevenue.toFixed(2)}`;
    }

    loadRecentOrders(orders) {
        const recentOrders = orders.slice(0, 5);
        const container = document.getElementById('recent-orders');
        
        if (recentOrders.length === 0) {
            container.innerHTML = '<p>No recent orders</p>';
            return;
        }

        const ordersHTML = recentOrders.map(order => `
            <div class="order-item" style="padding: 1rem; border-bottom: 1px solid var(--admin-accent);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>Order #${order._id}</strong>
                        <div style="color: #b2bec3; font-size: 0.9rem;">
                            ${order.customer.name} - ${order.products.length} items
                        </div>
                    </div>
                    <div>
                        <span class="status-badge status-${order.status}">${order.status}</span>
                        <div style="color: var(--admin-success); font-weight: 600;">
                            $${order.total.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = ordersHTML;
    }

    async loadProducts() {
        try {
            this.products = await this.fetchProducts();
            this.renderProductsTable();
        } catch (error) {
            console.error('Error loading products:', error);
            this.showNotification('Error loading products', 'error');
        }
    }

    async loadOrders() {
        try {
            this.orders = await this.fetchOrders();
            this.renderOrdersTable();
        } catch (error) {
            console.error('Error loading orders:', error);
            this.showNotification('Error loading orders', 'error');
        }
    }

    async loadUsers() {
        try {
            this.users = await this.fetchUsers();
            this.renderUsersTable();
        } catch (error) {
            console.error('Error loading users:', error);
            this.showNotification('Error loading users', 'error');
        }
    }

    async loadAnalytics() {
        try {
            const analytics = await this.fetchAnalytics();
            this.renderAnalytics(analytics);
        } catch (error) {
            console.error('Error loading analytics:', error);
            this.showNotification('Error loading analytics', 'error');
        }
    }

    renderProductsTable() {
        const tbody = document.getElementById('products-table');
        
        if (this.products.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No products found</td></tr>';
            return;
        }

        const rows = this.products.map(product => `
            <tr>
                <td>
                    <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">
                </td>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.category}</td>
                <td>${product.stock}</td>
                <td>
                    <span class="status-badge ${product.stock > 0 ? 'status-active' : 'status-cancelled'}">
                        ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-secondary" onclick="adminDashboard.editProduct('${product._id}')" style="margin-right: 0.5rem;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-secondary" onclick="adminDashboard.deleteProduct('${product._id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = rows;
    }

    renderOrdersTable() {
        const tbody = document.getElementById('orders-table');
        
        if (this.orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No orders found</td></tr>';
            return;
        }

        const rows = this.orders.map(order => `
            <tr>
                <td>#${order._id.slice(-8)}</td>
                <td>${order.customer.name}</td>
                <td>${order.products.length} items</td>
                <td>$${order.total.toFixed(2)}</td>
                <td>
                    <span class="status-badge status-${order.status}">${order.status}</span>
                </td>
                <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-secondary" onclick="adminDashboard.updateOrderStatus('${order._id}')" style="margin-right: 0.5rem;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-secondary" onclick="adminDashboard.viewOrderDetails('${order._id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = rows;
    }

    renderUsersTable() {
        const tbody = document.getElementById('users-table');
        
        if (this.users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No users found</td></tr>';
            return;
        }

        const rows = this.users.map(user => `
            <tr>
                <td>
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--admin-accent); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                        ${user.name.charAt(0).toUpperCase()}
                    </div>
                </td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <span class="status-badge ${user.isActive ? 'status-active' : 'status-cancelled'}">
                        ${user.isActive ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-secondary" onclick="adminDashboard.toggleUserStatus('${user._id}')" style="margin-right: 0.5rem;">
                        <i class="fas fa-power-off"></i>
                    </button>
                    <button class="btn btn-secondary" onclick="adminDashboard.editUser('${user._id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = rows;
    }

    renderAnalytics(analytics) {
        document.getElementById('monthly-sales').textContent = `$${analytics.monthlySales.toFixed(2)}`;
        document.getElementById('top-product').textContent = analytics.topProduct.name || 'N/A';
        
        // Simple chart using canvas
        this.drawSalesChart(analytics.salesData);
    }

    drawSalesChart(salesData) {
        const canvas = document.getElementById('sales-chart');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (!salesData || salesData.length === 0) return;
        
        const maxValue = Math.max(...salesData.map(d => d.value));
        const barWidth = canvas.width / salesData.length;
        
        ctx.fillStyle = '#00b894';
        salesData.forEach((data, index) => {
            const barHeight = (data.value / maxValue) * canvas.height;
            const x = index * barWidth;
            const y = canvas.height - barHeight;
            
            ctx.fillRect(x, y, barWidth - 2, barHeight);
            
            // Draw label
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Inter';
            ctx.fillText(data.label, x, canvas.height - 5);
            ctx.fillStyle = '#00b894';
        });
    }

    // API Methods
    async fetchProducts() {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    }

    async fetchOrders() {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        return await response.json();
    }

    async fetchUsers() {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        return await response.json();
    }

    async fetchAnalytics() {
        const response = await fetch('/api/analytics');
        if (!response.ok) throw new Error('Failed to fetch analytics');
        return await response.json();
    }

    // Product Management
    openProductModal(productId = null) {
        const modal = document.getElementById('product-modal');
        const title = document.getElementById('modal-title');
        const form = document.getElementById('product-form');
        
        if (productId) {
            title.textContent = 'Edit Product';
            const product = this.products.find(p => p._id === productId);
            if (product) {
                this.fillProductForm(product);
            }
        } else {
            title.textContent = 'Add New Product';
            form.reset();
        }
        
        modal.style.display = 'block';
    }

    closeProductModal() {
        document.getElementById('product-modal').style.display = 'none';
    }

    fillProductForm(product) {
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-image').value = product.image;
    }

    async saveProduct() {
        const formData = {
            name: document.getElementById('product-name').value,
            description: document.getElementById('product-description').value,
            price: parseFloat(document.getElementById('product-price').value),
            category: document.getElementById('product-category').value,
            stock: parseInt(document.getElementById('product-stock').value),
            image: document.getElementById('product-image').value
        };

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to save product');

            this.showNotification('Product saved successfully', 'success');
            this.closeProductModal();
            this.loadProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            this.showNotification('Error saving product', 'error');
        }
    }

    async deleteProduct(productId) {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete product');

            this.showNotification('Product deleted successfully', 'success');
            this.loadProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            this.showNotification('Error deleting product', 'error');
        }
    }

    // Search and Filter Methods
    searchProducts(query) {
        const filtered = this.products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
        this.renderFilteredProducts(filtered);
    }

    searchOrders(query) {
        const filtered = this.orders.filter(order =>
            order._id.includes(query) ||
            order.customer.name.toLowerCase().includes(query.toLowerCase())
        );
        this.renderFilteredOrders(filtered);
    }

    searchUsers(query) {
        const filtered = this.users.filter(user =>
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        );
        this.renderFilteredUsers(filtered);
    }

    renderFilteredProducts(products) {
        const tbody = document.getElementById('products-table');
        
        if (products.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No products found</td></tr>';
            return;
        }

        const rows = products.map(product => `
            <tr>
                <td>
                    <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">
                </td>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.category}</td>
                <td>${product.stock}</td>
                <td>
                    <span class="status-badge ${product.stock > 0 ? 'status-active' : 'status-cancelled'}">
                        ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-secondary" onclick="adminDashboard.editProduct('${product._id}')" style="margin-right: 0.5rem;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-secondary" onclick="adminDashboard.deleteProduct('${product._id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = rows;
    }

    renderFilteredOrders(orders) {
        const tbody = document.getElementById('orders-table');
        
        if (orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No orders found</td></tr>';
            return;
        }

        const rows = orders.map(order => `
            <tr>
                <td>#${order._id.slice(-8)}</td>
                <td>${order.customer.name}</td>
                <td>${order.products.length} items</td>
                <td>$${order.total.toFixed(2)}</td>
                <td>
                    <span class="status-badge status-${order.status}">${order.status}</span>
                </td>
                <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-secondary" onclick="adminDashboard.updateOrderStatus('${order._id}')" style="margin-right: 0.5rem;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-secondary" onclick="adminDashboard.viewOrderDetails('${order._id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = rows;
    }

    renderFilteredUsers(users) {
        const tbody = document.getElementById('users-table');
        
        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No users found</td></tr>';
            return;
        }

        const rows = users.map(user => `
            <tr>
                <td>
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--admin-accent); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                        ${user.name.charAt(0).toUpperCase()}
                    </div>
                </td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <span class="status-badge ${user.isActive ? 'status-active' : 'status-cancelled'}">
                        ${user.isActive ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-secondary" onclick="adminDashboard.toggleUserStatus('${user._id}')" style="margin-right: 0.5rem;">
                        <i class="fas fa-power-off"></i>
                    </button>
                    <button class="btn btn-secondary" onclick="adminDashboard.editUser('${user._id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = rows;
    }

    // Utility Methods
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;

        // Set background color based on type
        switch(type) {
            case 'success':
                notification.style.background = 'var(--admin-success)';
                break;
            case 'error':
                notification.style.background = 'var(--admin-danger)';
                break;
            case 'warning':
                notification.style.background = 'var(--admin-warning)';
                break;
            default:
                notification.style.background = 'var(--admin-accent)';
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    logout() {
        localStorage.removeItem('adminToken');
        window.location.href = 'login.html';
    }
}

// Initialize admin dashboard
const adminDashboard = new AdminDashboard();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Global functions for onclick handlers
window.openProductModal = (productId) => adminDashboard.openProductModal(productId);
window.closeProductModal = () => adminDashboard.closeProductModal();
window.logout = () => adminDashboard.logout();
window.searchProducts = () => adminDashboard.searchProducts(document.getElementById('product-search').value);
window.searchOrders = () => adminDashboard.searchOrders(document.getElementById('order-search').value);
window.searchUsers = () => adminDashboard.searchUsers(document.getElementById('user-search').value);
window.filterOrders = () => adminDashboard.filterOrders();
window.saveSettings = () => adminDashboard.saveSettings();

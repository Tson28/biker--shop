// BikerHUB Profile JavaScript
class UserProfile {
    constructor() {
        this.currentSection = 'profile';
        this.userData = null;
        this.orders = [];
        this.wishlist = [];
        this.addresses = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuth();
        this.loadUserData();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(e.currentTarget.dataset.section);
            });
        });

        // Forms
        document.getElementById('profile-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateProfile();
        });

        document.getElementById('password-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.changePassword();
        });
    }

    checkAuth() {
        const token = localStorage.getItem('userToken');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }
    }

    async loadUserData() {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch('/api/users/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to load user data');
            }

            this.userData = await response.json();
            this.updateProfileDisplay();
            this.loadOrders();
            this.loadWishlist();
            this.loadAddresses();
        } catch (error) {
            console.error('Error loading user data:', error);
            this.showNotification('Error loading user data', 'error');
        }
    }

    updateProfileDisplay() {
        if (!this.userData) return;

        // Update header
        document.getElementById('profile-avatar').textContent = this.userData.name.charAt(0).toUpperCase();
        document.getElementById('profile-name').textContent = this.userData.name;
        document.getElementById('profile-email').textContent = this.userData.email;

        // Update stats
        document.getElementById('total-orders').textContent = this.orders.length;
        document.getElementById('total-spent').textContent = `$${this.calculateTotalSpent().toFixed(2)}`;
        document.getElementById('wishlist-count').textContent = this.wishlist.length;
        document.getElementById('member-since').textContent = this.calculateMemberDays();

        // Fill profile form
        document.getElementById('full-name').value = this.userData.name || '';
        document.getElementById('email').value = this.userData.email || '';
        document.getElementById('phone').value = this.userData.phone || '';
        document.getElementById('birthdate').value = this.userData.birthdate || '';
        document.getElementById('bio').value = this.userData.bio || '';
    }

    calculateTotalSpent() {
        return this.orders.reduce((total, order) => total + order.total, 0);
    }

    calculateMemberDays() {
        if (!this.userData.createdAt) return 0;
        const created = new Date(this.userData.createdAt);
        const now = new Date();
        const diffTime = Math.abs(now - created);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    switchSection(section) {
        // Hide all sections
        document.querySelectorAll('[id$="-section"]').forEach(el => {
            el.style.display = 'none';
        });

        // Remove active class from all nav items
        document.querySelectorAll('.sidebar-nav a').forEach(el => {
            el.classList.remove('active');
        });

        // Show selected section
        document.getElementById(`${section}-section`).style.display = 'block';
        
        // Add active class to selected nav item
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        
        this.currentSection = section;
    }

    async loadOrders() {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch('/api/orders/my-orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to load orders');
            }

            this.orders = await response.json();
            this.renderOrders();
            this.updateProfileDisplay(); // Update stats
        } catch (error) {
            console.error('Error loading orders:', error);
            this.showNotification('Error loading orders', 'error');
        }
    }

    async loadWishlist() {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch('/api/users/wishlist', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to load wishlist');
            }

            this.wishlist = await response.json();
            this.renderWishlist();
            this.updateProfileDisplay(); // Update stats
        } catch (error) {
            console.error('Error loading wishlist:', error);
            this.showNotification('Error loading wishlist', 'error');
        }
    }

    async loadAddresses() {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch('/api/users/addresses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to load addresses');
            }

            this.addresses = await response.json();
            this.renderAddresses();
        } catch (error) {
            console.error('Error loading addresses:', error);
            this.showNotification('Error loading addresses', 'error');
        }
    }

    renderOrders() {
        const container = document.getElementById('orders-grid');
        
        if (this.orders.length === 0) {
            container.innerHTML = '<p style="color: white; text-align: center;">No orders found</p>';
            return;
        }

        const ordersHTML = this.orders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-id">Order #${order._id.slice(-8)}</div>
                    <span class="order-status status-${order.status}">${order.status}</span>
                </div>
                
                <div class="order-items">
                    ${order.products.map(product => `
                        <div class="order-item">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="order-item-details">
                                <div class="order-item-name">${product.name}</div>
                                <div class="order-item-price">$${product.price.toFixed(2)} x ${product.quantity}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="order-total">
                    Total: $${order.total.toFixed(2)}
                </div>
            </div>
        `).join('');

        container.innerHTML = ordersHTML;
    }

    renderWishlist() {
        const container = document.getElementById('wishlist-grid');
        
        if (this.wishlist.length === 0) {
            container.innerHTML = '<p style="color: white; text-align: center;">No wishlist items found</p>';
            return;
        }

        const wishlistHTML = this.wishlist.map(item => `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}" class="wishlist-image">
                <div class="wishlist-content">
                    <div class="wishlist-name">${item.name}</div>
                    <div class="wishlist-price">$${item.price.toFixed(2)}</div>
                    <div class="wishlist-actions">
                        <button class="btn btn-primary" onclick="userProfile.addToCart('${item._id}')">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="btn btn-secondary" onclick="userProfile.removeFromWishlist('${item._id}')">
                            <i class="fas fa-heart-broken"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = wishlistHTML;
    }

    renderAddresses() {
        const container = document.getElementById('addresses-list');
        
        if (this.addresses.length === 0) {
            container.innerHTML = '<p style="color: white; text-align: center;">No addresses found</p>';
            return;
        }

        const addressesHTML = this.addresses.map(address => `
            <div class="address-item" style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 12px; margin-bottom: 1rem; border: 1px solid rgba(255,255,255,0.2);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <strong style="color: white;">${address.label}</strong>
                    <div>
                        <button class="btn btn-secondary" onclick="userProfile.editAddress('${address._id}')" style="margin-right: 0.5rem;">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-secondary" onclick="userProfile.deleteAddress('${address._id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div style="color: rgba(255,255,255,0.8);">
                    ${address.street}<br>
                    ${address.city}, ${address.state} ${address.zipCode}<br>
                    ${address.country}
                </div>
            </div>
        `).join('');

        container.innerHTML = addressesHTML;
    }

    async updateProfile() {
        const formData = {
            name: document.getElementById('full-name').value,
            phone: document.getElementById('phone').value,
            birthdate: document.getElementById('birthdate').value,
            bio: document.getElementById('bio').value
        };

        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedUser = await response.json();
            this.userData = { ...this.userData, ...updatedUser };
            this.updateProfileDisplay();
            this.showNotification('Profile updated successfully', 'success');
        } catch (error) {
            console.error('Error updating profile:', error);
            this.showNotification('Error updating profile', 'error');
        }
    }

    async changePassword() {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            this.showNotification('New passwords do not match', 'error');
            return;
        }

        if (newPassword.length < 6) {
            this.showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch('/api/users/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                })
            });

            if (!response.ok) {
                throw new Error('Failed to change password');
            }

            this.showNotification('Password changed successfully', 'success');
            document.getElementById('password-form').reset();
        } catch (error) {
            console.error('Error changing password:', error);
            this.showNotification('Error changing password', 'error');
        }
    }

    async addToCart(productId) {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId,
                    quantity: 1
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            this.showNotification('Added to cart successfully', 'success');
        } catch (error) {
            console.error('Error adding to cart:', error);
            this.showNotification('Error adding to cart', 'error');
        }
    }

    async removeFromWishlist(productId) {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(`/api/users/wishlist/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to remove from wishlist');
            }

            this.wishlist = this.wishlist.filter(item => item._id !== productId);
            this.renderWishlist();
            this.updateProfileDisplay();
            this.showNotification('Removed from wishlist', 'success');
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            this.showNotification('Error removing from wishlist', 'error');
        }
    }

    async editAddress(addressId) {
        const address = this.addresses.find(addr => addr._id === addressId);
        if (!address) return;

        // Create edit form
        const editForm = `
            <div class="address-edit-form" style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px; margin-top: 1rem;">
                <h4 style="color: white; margin-bottom: 1rem;">Edit Address</h4>
                <div class="form-group">
                    <label style="color: white;">Label</label>
                    <input type="text" id="edit-address-label" value="${address.label}" style="width: 100%; padding: 0.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white;">
                </div>
                <div class="form-group">
                    <label style="color: white;">Street</label>
                    <input type="text" id="edit-address-street" value="${address.street}" style="width: 100%; padding: 0.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white;">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label style="color: white;">City</label>
                        <input type="text" id="edit-address-city" value="${address.city}" style="width: 100%; padding: 0.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white;">
                    </div>
                    <div class="form-group">
                        <label style="color: white;">State</label>
                        <input type="text" id="edit-address-state" value="${address.state}" style="width: 100%; padding: 0.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white;">
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label style="color: white;">ZIP Code</label>
                        <input type="text" id="edit-address-zip" value="${address.zipCode}" style="width: 100%; padding: 0.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white;">
                    </div>
                    <div class="form-group">
                        <label style="color: white;">Country</label>
                        <input type="text" id="edit-address-country" value="${address.country}" style="width: 100%; padding: 0.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white;">
                    </div>
                </div>
                <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                    <button class="btn btn-primary" onclick="userProfile.saveAddressEdit('${addressId}')">Save</button>
                    <button class="btn btn-secondary" onclick="userProfile.cancelAddressEdit()">Cancel</button>
                </div>
            </div>
        `;

        // Find the address item and replace with edit form
        const addressItem = document.querySelector(`[onclick="userProfile.editAddress('${addressId}')"]`).closest('.address-item');
        addressItem.innerHTML = editForm;
    }

    async saveAddressEdit(addressId) {
        const formData = {
            label: document.getElementById('edit-address-label').value,
            street: document.getElementById('edit-address-street').value,
            city: document.getElementById('edit-address-city').value,
            state: document.getElementById('edit-address-state').value,
            zipCode: document.getElementById('edit-address-zip').value,
            country: document.getElementById('edit-address-country').value
        };

        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(`/api/users/addresses/${addressId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update address');
            }

            this.showNotification('Address updated successfully', 'success');
            this.loadAddresses(); // Reload addresses
        } catch (error) {
            console.error('Error updating address:', error);
            this.showNotification('Error updating address', 'error');
        }
    }

    cancelAddressEdit() {
        this.loadAddresses(); // Reload to show original view
    }

    async deleteAddress(addressId) {
        if (!confirm('Are you sure you want to delete this address?')) return;

        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(`/api/users/addresses/${addressId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete address');
            }

            this.showNotification('Address deleted successfully', 'success');
            this.loadAddresses(); // Reload addresses
        } catch (error) {
            console.error('Error deleting address:', error);
            this.showNotification('Error deleting address', 'error');
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            document.body.removeChild(notification);
        });

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
}

// Initialize user profile
const userProfile = new UserProfile();

// Global functions for onclick handlers
window.addNewAddress = () => {
    // This would open a modal or form to add a new address
    userProfile.showNotification('Add address functionality coming soon', 'info');
};

window.saveNotificationSettings = () => {
    const emailNotifications = document.getElementById('email-notifications').checked;
    const smsNotifications = document.getElementById('sms-notifications').checked;
    const orderUpdates = document.getElementById('order-updates').checked;
    const promotionalEmails = document.getElementById('promotional-emails').checked;

    // Save notification preferences
    localStorage.setItem('notificationPreferences', JSON.stringify({
        emailNotifications,
        smsNotifications,
        orderUpdates,
        promotionalEmails
    }));

    userProfile.showNotification('Notification preferences saved', 'success');
};

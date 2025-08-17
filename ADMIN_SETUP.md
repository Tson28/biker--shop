# BikerHUB Admin Panel Setup Guide

## Overview
The BikerHUB Admin Panel provides comprehensive management capabilities for:
- **User Management**: Manage regular users, moderators, and staff
- **Staff Management**: Add, edit, and manage staff members
- **Product Management**: Manage products, inventory, and categories
- **Order Management**: Track and manage customer orders
- **Analytics**: View sales reports and user statistics

## Initial Setup

### 1. Create Admin User
First, you need to create an admin user to access the panel:

```bash
cd backend
npm run create-admin
```

This will create an admin user with:
- **Email**: admin@bikerhub.com
- **Username**: admin
- **Password**: admin123
- **Role**: admin

**Important**: Change the password after first login!

### 2. Access Admin Panel
Navigate to: `http://localhost:3000/admin-login.html`

Use the credentials created above to log in.

## Features

### Dashboard
- Overview of total products, orders, users, and staff
- Recent orders display
- Revenue statistics
- Pending orders count

### User Management
- View all users with search and filtering
- Edit user profiles and roles
- Activate/deactivate users
- Delete users (admin only)

### Staff Management
- Add new staff members
- Assign roles (staff, moderator, admin)
- Set departments
- Manage staff status

### Product Management
- Add new products
- Edit existing products
- Manage inventory
- Category filtering
- Search functionality

### Order Management
- View all orders
- Filter by status
- Search orders
- Update order status

### Analytics
- Monthly sales data
- Top-selling products
- User conversion rates
- Sales charts

## User Roles

### Admin
- Full access to all features
- Can create, edit, and delete users/staff
- Can manage all products and orders
- Access to analytics and settings

### Moderator
- Can view and edit products
- Can manage orders
- Limited user management
- Access to analytics

### Staff
- Basic product management
- Order viewing
- Limited access to user data

## Security Features

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Account lockout after failed attempts
- Session management

## API Endpoints

### Authentication
- `POST /api/auth/admin-login` - Admin login
- `GET /api/auth/verify-admin` - Verify admin token
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create new user/staff (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `PATCH /api/users/:id/status` - Update user status (admin only)

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

## Customization

### Adding New Fields
To add new fields to users or products:

1. Update the model in `backend/models/`
2. Update the admin form in `frontend/admin.html`
3. Update the JavaScript handling in `frontend/admin-script.js`

### Adding New Sections
To add new admin sections:

1. Add navigation item in `frontend/admin.html`
2. Create section content
3. Add JavaScript functionality in `frontend/admin-script.js`

## Troubleshooting

### Common Issues

1. **Can't access admin panel**
   - Check if admin user exists
   - Verify database connection
   - Check server logs

2. **Login not working**
   - Verify email/username and password
   - Check if account is active
   - Verify JWT secret in config

3. **Permission denied errors**
   - Check user role
   - Verify token validity
   - Check middleware configuration

### Logs
Check server logs for detailed error information:
```bash
cd backend
npm run dev
```

## Best Practices

1. **Security**
   - Change default admin password
   - Use strong passwords
   - Regularly rotate admin tokens
   - Monitor login attempts

2. **User Management**
   - Assign appropriate roles
   - Regularly review user permissions
   - Deactivate unused accounts

3. **Data Management**
   - Regular backups
   - Monitor database performance
   - Clean up old data

## Support

For technical support or questions about the admin panel, please refer to the main project documentation or contact the development team.

---

**Version**: 2.0.0  
**Last Updated**: December 2024  
**Compatibility**: Node.js 18+, MongoDB 5+

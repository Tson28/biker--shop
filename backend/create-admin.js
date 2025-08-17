const mongoose = require('mongoose');
const User = require('./models/User');
const config = require('./config/config');

async function createAdminUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            console.log('Email:', existingAdmin.email);
            console.log('Username:', existingAdmin.username);
            process.exit(0);
        }

        // Create admin user
        const adminData = {
            username: 'admin',
            email: 'admin@bikerhub.com',
            password: 'admin123',
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin',
            isVerified: true,
            isActive: true,
            department: 'Management'
        };

        const admin = new User(adminData);
        await admin.save();

        console.log('Admin user created successfully!');
        console.log('Email:', admin.email);
        console.log('Username:', admin.username);
        console.log('Password: admin123');
        console.log('\nPlease change the password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
}

// Run the script
createAdminUser();

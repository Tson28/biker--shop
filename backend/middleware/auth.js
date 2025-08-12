const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');
const logger = require('../utils/logger');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                  req.cookies?.token ||
                  req.query?.token;

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token, authorization denied'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Token is not valid'
      });
    }

    // Check if user is active
    if (user.status === 'inactive') {
      return res.status(401).json({
        status: 'error',
        message: 'Account is deactivated'
      });
    }

    // Add user to request object
    req.user = user;
    next();

  } catch (error) {
    logger.error('Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Server error during authentication'
    });
  }
};

// Middleware to check if user is admin
const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};

// Middleware to check if user is moderator or admin
const moderator = (req, res, next) => {
  if (!['admin', 'moderator'].includes(req.user.role)) {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Moderator or admin privileges required.'
    });
  }
  next();
};

// Middleware to check if user owns the resource or is admin
const ownerOrAdmin = (resourceUserId) => {
  return (req, res, next) => {
    if (req.user.role === 'admin') {
      return next();
    }
    
    if (req.user.id.toString() === resourceUserId.toString()) {
      return next();
    }
    
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. You can only access your own resources.'
    });
  };
};

module.exports = { auth, admin, moderator, ownerOrAdmin };

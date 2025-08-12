import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Simple test route
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Auth route working',
    data: { status: 'active' }
  });
});

// Register route
router.post('/register', [
  body('username').isLength({ min: 3, max: 30 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    res.json({
      success: true,
      message: 'User registered successfully',
      data: req.body
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Login route
router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token: 'sample_token_' + Date.now(),
        user: { email: req.body.email }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

export default router;

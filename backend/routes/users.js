import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Users route working',
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'User profile route working',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Update user profile
router.put('/profile', [
  body('name').optional().isLength({ min: 2, max: 50 }),
  body('email').optional().isEmail(),
  body('phone').optional().isMobilePhone()
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
      message: 'Profile updated successfully',
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

export default router;

import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Orders route working',
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

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.json({
      success: true,
      message: 'Order route working',
      data: { id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Create new order
router.post('/', [
  body('items').isArray({ min: 1 }),
  body('total').isFloat({ min: 0 })
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
      message: 'Order created successfully',
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

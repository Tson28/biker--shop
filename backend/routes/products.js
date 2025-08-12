import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Products route working',
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

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.json({
      success: true,
      message: 'Product route working',
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

// Create new product
router.post('/', [
  body('name').isLength({ min: 2, max: 100 }),
  body('price').isFloat({ min: 0 }),
  body('description').isLength({ min: 10, max: 1000 })
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
      message: 'Product created successfully',
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

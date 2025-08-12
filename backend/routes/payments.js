import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Process payment
router.post('/process', [
  body('amount').isFloat({ min: 0 }),
  body('currency').isIn(['USD', 'EUR', 'GBP']),
  body('paymentMethod').isString()
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
      message: 'Payment processed successfully',
      data: {
        transactionId: 'txn_' + Date.now(),
        status: 'completed',
        amount: req.body.amount
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

// Get payment status
router.get('/status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.json({
      success: true,
      message: 'Payment status route working',
      data: { 
        id,
        status: 'completed'
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

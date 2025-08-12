import express from 'express';

const router = express.Router();

// Upload file
router.post('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Upload route working',
      data: {
        filename: 'sample.jpg',
        url: 'https://example.com/sample.jpg',
        size: 1024
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

// Get uploaded files
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Uploads list route working',
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

export default router;

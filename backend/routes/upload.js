const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { verifyToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Store the uploaded file temporarily in memory before sending to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', verifyToken, requireAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Convert the file buffer into a base64 string Cloudinary can accept
    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: 'iuea-nigerian-students/leaders',
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error uploading image' });
  }
});

module.exports = router;

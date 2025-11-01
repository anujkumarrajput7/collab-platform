const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/authMiddleware');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`;
    cb(null, name);
  }
});

const upload = multer({ storage });

router.post('/', auth, upload.single('media'), uploadController.upload);

module.exports = router;
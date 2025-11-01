const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const postController = require('../controllers/postController');

router.get('/', postController.feed);
router.get('/me', auth, postController.mine);
router.get('/:id', postController.getOne);
router.post('/', auth, postController.create);
router.post('/:id/like', auth, postController.like);
router.get('/:id/comments', postController.getComments);
router.post('/:id/comments', auth, postController.addComment);

module.exports = router;

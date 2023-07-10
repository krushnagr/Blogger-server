const express = require('express');
const { getAllBlog, CretateBlog, UpdateBlog, getBlogbyId, deleteBlogById, userblog } = require('../controller/blogController');

const router = express.Router();

router.get('/all-blog',getAllBlog);

router.post('/create-blog',CretateBlog);

router.put('/update-blog/:id',UpdateBlog);

router.get('/get-blog/:id',getBlogbyId);

router.delete('/detele-blog/:id',deleteBlogById);

// GET || User blog
router.get('/user-blog/:id',userblog);

module.exports = router;
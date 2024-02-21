import express from 'express';
import { getPost } from '../controllers/posts.js';
import { createPost } from '../controllers/posts.js';
import { updatePost } from '../controllers/posts.js';
const router=express.Router();

router.route('/').get( getPost)
router.route('/').post(createPost)
router.patch('/:id', updatePost);
export default router
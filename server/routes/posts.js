import express from 'express';
import { getPost } from '../controllers/posts.js';
import { createPost } from '../controllers/posts.js';
import { updatePost , deletePost , likePost } from '../controllers/posts.js';
const router=express.Router();

router.route('/').get( getPost)
router.route('/').post(createPost)
//router.route('/:id).patch(updatePost)
router.patch('/:id', updatePost);
router.route('/:id').delete(deletePost)
router.route('/:id/likePost').patch(likePost)
export default router
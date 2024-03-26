import express from 'express';
import { getPost } from '../controllers/posts.js';
import { createPost } from '../controllers/posts.js';
import { updatePost , deletePost , likePost } from '../controllers/posts.js';
const router=express.Router();
import auth from '../middlewares/auth.middleware.js';

router.route('/').get( getPost)
router.route('/',auth).post(createPost)
//router.route('/:id).patch(updatePost)
router.patch('/:id',auth, updatePost);
router.route('/:id',auth).delete(deletePost)
router.route('/:id/likePost',auth).patch(likePost)
export default router
import express from 'express';
import { getPosts,getPost } from '../controllers/posts.js';
import { createPost } from '../controllers/posts.js';
import { getPostsBySearch } from '../controllers/posts.js';
import { updatePost , deletePost , likePost ,commentPost} from '../controllers/posts.js';
const router=express.Router();
import auth from '../middlewares/auth.middleware.js';

router.route('/search').get(getPostsBySearch)
router.route('/').get( getPosts)
router.route('/:id').get(getPost)

router.route('/',auth).post(createPost)
//router.route('/:id).patch(updatePost)
router.patch('/:id',auth, updatePost);
router.route('/:id',auth).delete(deletePost)
router.route('/:id/likePost',auth).patch(likePost)
router.route('/:id/commentPost',auth).post(commentPost)
export default router
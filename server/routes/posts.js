import express from 'express';
import { func } from '../controllers/posts.js';

const router=express.Router();



router.route('/').get( func)

export default router
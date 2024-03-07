import express from 'express';
import {signin,signup} from '../controllers/users.js'
const router=express.Router();

router.route('/signin').post(signin) //send all the information from the form to the backend and then some action will occur
router.route('/signup').post(signup)


export default router
import express from 'express'
import {  allUser, getAllusers, getFriends, getUser, login, register } from '../controllers/AuthController.js';
const router=express.Router();
import {isAuthenticated} from '../middlewares/Auth.js'
import { bothUserChat, chatUser, newChat } from '../controllers/ChatController.js';
import { addChat, getMesage } from '../controllers/MessageController.js';



router.post('/register',register);
router.post('/login',login);
router.get('/',isAuthenticated,allUser);
router.get('/all',isAuthenticated,getAllusers);
router.get('/sender/:id',isAuthenticated,getUser);
router.get('/friends/:id',isAuthenticated,getFriends);

// chat route

router.post('/chat',isAuthenticated,newChat);
router.get('/chat/:userId',isAuthenticated,chatUser);
router.get('/chat/find/:firstUserId/:secondUserId',isAuthenticated,bothUserChat);


// message route
router.post('/message',isAuthenticated,addChat);
router.get('/message/:conversationId',isAuthenticated,getMesage);

export default router;
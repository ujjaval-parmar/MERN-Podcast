import { Router } from 'express'
import { checkToken, getUser, logout, signin, signup } from '../controllers/userController.js';
import { verifyToken } from '../helper/verifyToken.js';





const userRouter = Router();


// signUp:
userRouter.get('/user-details/', verifyToken, getUser);
userRouter.post('/sign-up', signup);
userRouter.post('/sign-in', signin);
userRouter.get('/logout', logout);
userRouter.get('/check-token', checkToken);



export default userRouter;
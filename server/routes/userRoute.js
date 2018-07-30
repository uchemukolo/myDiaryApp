import express from 'express';
import validate from '../middlewares/validate';
import user from '../controllers/users';

const router = express.Router();


router.post('/signup', validate.register, user.signUp);
router.post('/login', validate.login, user.signIn);

export default router;

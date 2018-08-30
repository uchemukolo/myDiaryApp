import express from 'express';
import validate from '../middlewares/validate';
import auth from '../helpers/authentication';
import user from '../controllers/users';

const router = express.Router();


router.post('/signup', validate.register, user.signUp);
router.post('/login', validate.login, user.signIn);
router.get('/profile', auth.verify, user.userProfile);
router.put('/profile/update', auth.verify, user.updateProfile);
router.post('/reminder', auth.verify, validate.addReminder, user.addReminder);
router.post('/password/resetLink', user.forgotPassword);
router.put('/password/change', user.createNewPassword);


export default router;

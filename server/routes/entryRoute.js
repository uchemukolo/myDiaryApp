import express from 'express';
import entry from '../controllers/entries';
import validate from '../middlewares/validate';
import auth from '../helpers/authentication';

const router = express.Router();

router.post('/', auth.verify, validate.createEntry, entry.createEntry);
router.get('/', auth.verify, entry.getAll);
router.get('/:entryId', auth.verify, validate.entryId, entry.getOne);
router.delete('/:entryId', auth.verify, validate.entryId, entry.deleteEntry);



export default router;

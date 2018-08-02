import express from 'express';
import entry from '../controllers/entries';
import validate from '../middlewares/validate';
import auth from '../helpers/authentication';

const router = express.Router();

router.post('/', auth.verify, validate.entry, entry.createEntry);
router.put('/:entryId', auth.verify, validate.entryId, validate.entry, entry.modifyEntry);
router.get('/', auth.verify, entry.getAll);
router.get('/:entryId', auth.verify, validate.entryId, entry.getOne);
router.delete('/:entryId', auth.verify, validate.entryId, entry.deleteEntry);


export default router;

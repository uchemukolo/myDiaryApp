import express from 'express';
import entry from '../controllers/entries';
import Validate from '../middlewares/validate';

const router = express.Router();

router.get('/', entry.getAll);
router.get('/:entryId', entry.getOne);
router.post('/', Validate.createEntry, entry.createEntry);
router.put('/:entryId', entry.modifyEntry);


export default router;
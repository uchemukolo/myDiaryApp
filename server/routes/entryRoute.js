import express from 'express';
import entry from '../controllers/entries';
import validate from '../middlewares/validate';

const router = express.Router();

router.get('/', entry.getAll);
router.get('/:entryId', entry.getOne);
router.post('/', validate.createEntry, entry.createEntry);
router.put('/:entryId', validate.modifyEntry, entry.modifyEntry);


export default router;
import express from 'express';
import entry from '../controllers/entries';
import validate from '../middlewares/validate';

const router = express.Router();

router.get('/', entry.getAll);
router.get('/:entryId', validate.entryId, entry.getOne);
router.post('/', validate.createEntry, entry.createEntry);
router.put('/:entryId', validate.entryId, validate.modifyEntry, entry.modifyEntry);
router.delete('/:entryId', validate.entryId, entry.deleteEntry);


export default router;

import express from 'express';
import bodyParser from 'body-parser';
import entry from '../controllers/entries';

const router = express.Router();

router.get('/', entry.getAll);
router.get('/:entryId', entry.getOne);


export default router;
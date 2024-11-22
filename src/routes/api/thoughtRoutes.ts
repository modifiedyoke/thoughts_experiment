import { Router } from 'express';
const router = Router();
import {
    createThought,
    deleteThought,
    getAllThoughts
} from '../../controllers/thoughtController.js';

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtID')
.delete(deleteThought);


export { router as thoughtRouter };
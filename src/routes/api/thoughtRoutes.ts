import { Router } from 'express';
const router = Router();
import {
    createThought,
    deleteThought,
    getAllThoughts,
    getSingleThought,
    createReaction,
    deleteReaction
} from '../../controllers/thoughtController.js';

// /api/thoughts

router.route('/')
    .get(getAllThoughts)
    .post(createThought);

router.route('/:thoughtId')
    .delete(deleteThought)
    .get(getSingleThought);

router.route('/:thoughtId/reactions')
    .post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

export { router as thoughtRouter };
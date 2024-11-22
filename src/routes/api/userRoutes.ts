import { Router } from 'express';
const router = Router();
import {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser
} from '../../controllers/userController.js';

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

export { router as userRouter };

import { Router } from 'express';
const router = Router();
import {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend
} from '../../controllers/userController.js';

// /api/users
router.route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend);

export { router as userRouter };

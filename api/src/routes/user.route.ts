import { Router } from 'express';
import * as controller from '../controllers/user.controller';
import { authorizeUser, validate } from '../middleware';
import { listUsersSchema, updateUserSchema, getUserSchema, deleteUserSchema } from '../schema';
import { use } from '../utils';

const router = Router();

router.param('id', use(controller.load));

router
  .route('/')
  .get(authorizeUser, validate(getUserSchema), use(controller.get))
  .get(authorizeUser, validate(listUsersSchema), use(controller.listUsers))
  .patch(authorizeUser, validate(updateUserSchema), controller.update)
  .delete(authorizeUser, validate(deleteUserSchema), controller.remove);

export default router;

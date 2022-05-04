import { Router } from 'express';
import * as controller from '../controllers/user.controller';
import { authorizeUser, validate } from '../middleware';
import { listUsersSchema, updateUserSchema, getUserSchema, deleteUserSchema } from '../schema';
import { use } from '../utils';

const router = Router();

router.param('id', controller.load);

router
  .route('/:id')
  .get(authorizeUser, validate(getUserSchema), use(controller.get))
  .patch(authorizeUser, validate(updateUserSchema), controller.update)
  .delete(authorizeUser, validate(deleteUserSchema), controller.remove);

router.get('/list/users', authorizeUser, validate(listUsersSchema), use(controller.listUsers));

export default router;

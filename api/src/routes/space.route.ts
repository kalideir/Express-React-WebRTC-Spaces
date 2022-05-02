import { Router } from 'express';
import * as controller from '../controllers/space.controller';
import { authorizeUser, validate } from '../middleware';
import {
  createParticipantSchema,
  createSpaceSchema,
  deleteParticipantSchema,
  deleteSpaceSchema,
  getSpaceSchema,
  listSpacesSchema,
  updateParticipantSchema,
  updateSpaceSchema,
} from '../schema';
import { use } from '../utils';

const router = Router();

router.param('id', controller.load);

router.route('/').post(authorizeUser, validate(createSpaceSchema), use(controller.create));

router
  .route('/:id')
  .get(authorizeUser, validate(getSpaceSchema), use(controller.get))
  .patch(authorizeUser, validate(updateSpaceSchema), controller.update)
  .delete(authorizeUser, validate(deleteSpaceSchema), controller.remove);

router.route('/:id/participants/').post(authorizeUser, validate(createParticipantSchema), use(controller.createParticipant));

router
  .route('/:id/participants/:pid')
  .patch(authorizeUser, validate(updateParticipantSchema), controller.createParticipant)
  .delete(authorizeUser, validate(deleteParticipantSchema), controller.createParticipant);

// router.get('list', authorizeUser, validate(listSpacesSchema), use(controller.listSpaces));

export default router;

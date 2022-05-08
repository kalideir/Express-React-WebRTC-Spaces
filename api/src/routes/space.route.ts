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

router.param('key', controller.load);

router.route('/').post(authorizeUser, validate(createSpaceSchema), use(controller.create));

router
  .route('/:key')
  .get(authorizeUser, validate(getSpaceSchema), use(controller.get))
  .patch(authorizeUser, validate(updateSpaceSchema), controller.update)
  .delete(authorizeUser, validate(deleteSpaceSchema), controller.remove);
//validate(createParticipantSchema)
router.route('/:key/participants/').post(authorizeUser, use(controller.createParticipant));
router.route('/list/mySpaces').get(authorizeUser, use(controller.mySpaces));
router.route('/list/onlineSpaces').get(authorizeUser, use(controller.onlineSpaces));

router
  .route('/:id/participants/:pid')
  .patch(authorizeUser, validate(updateParticipantSchema), controller.createParticipant)
  .delete(authorizeUser, validate(deleteParticipantSchema), controller.createParticipant);

// router.get('list', authorizeUser, validate(listSpacesSchema), use(controller.listSpaces));

export default router;

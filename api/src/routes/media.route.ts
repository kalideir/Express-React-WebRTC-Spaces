import { Router } from 'express';
import * as controller from '../controllers/media.controller';
import { authorizeUser, validate } from '../middleware';
import { createMediaSchema, deleteMediaSchema, getMediaSchema, updateMediaSchema } from '../schema';
import { use } from '../utils';

const router = Router();

router.param('id', controller.load);

router.route('/').post(authorizeUser, validate(createMediaSchema), use(controller.create));

router.post('/new/s3UploadUrl', authorizeUser, use(controller.s3UploadUrl));

router
  .route('/:id')
  .get(authorizeUser, validate(getMediaSchema), use(controller.get))
  .patch(authorizeUser, validate(updateMediaSchema), use(controller.update))
  .delete(authorizeUser, validate(deleteMediaSchema), use(controller.remove));

export default router;

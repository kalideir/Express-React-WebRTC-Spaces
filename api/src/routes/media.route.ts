import { Router } from 'express';
import * as controller from '../controllers/media.controller';
import { authorizeUser, validate } from '../middleware';
import { createMediaSchema, deleteMediaSchema } from '../schema';
import Multer, { memoryStorage } from 'multer';
import { use } from '../utils';

const router = Router();

const storage = memoryStorage();

const multer = Multer({
  storage,
});

router.param('id', controller.load);

/**
 * @swagger
 * /media:
 *   post:
 *     tags:
 *       - Media
 *     summary: Upload file + create media instance
 *     consumes:
 *       - multipart/form-data
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               contentType:
 *                  type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/', multer.single('file'), validate(createMediaSchema), use(controller.create));

/**
 * @swagger
 * /media/{id}:
 *   delete:
 *     tags:
 *       - Media
 *     summary: Delete media
 *     consumes:
 *       - application/json
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.delete('/:id', validate(deleteMediaSchema), use(controller.remove));

router.route('/:id').get(use(controller.get));

router.post('/imageUpload', authorizeUser, multer.single('image'), use(controller.upload));

export default router;

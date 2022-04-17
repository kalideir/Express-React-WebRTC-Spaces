import { Router } from 'express';
import * as controller from '../controllers/user.controller';
import { authorizeUser, validate } from '../middleware';
import { listUsersSchema, updateUserSchema, getUserSchema, deleteUserSchema } from '../schema';
import { use } from '../utils';

const router = Router();

/**
 * @swagger
 * /user:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update new user
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  allOf:
 *                      - $ref: '#/components/schemas/UpdateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.patch('/', authorizeUser, validate(updateUserSchema), use(controller.update));

router.delete('/:id', authorizeUser, validate(deleteUserSchema), use(controller.remove));

/**
 * @swagger
 * /user/list/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: List all users
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: role
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         schema:
 *           type: number
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  allOf:
 *                      - $ref: '#/components/schemas/ListUsersResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/list/users', authorizeUser, validate(listUsersSchema), use(controller.listUsers));

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user data by id
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  allOf:
 *                      - $ref: '#/components/schemas/GetUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/:id', authorizeUser, validate(getUserSchema), use(controller.get));

export default router;

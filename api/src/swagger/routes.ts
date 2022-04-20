/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register new user
 *     security: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/RegisterUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     security: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginInput'
 *     responses:
 *      200:
 *        description: Success
 *        headers:
 *          Set-Cookie:
 *            schema:
 *              type: string
 *              example: authCookie=abcde12345; Path=/; HttpOnly
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /auth/verifyUser:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify user
 *     security: []
 *     parameters:
 *       - name: verificationCode
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/VerifyUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /auth/resendVerificationCode:
 *   post:
 *     tags:
 *       - Auth
 *     name: Forgot Password
 *     summary: Forgot password
 *     security: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/ResendVerificationCodeInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResendVerificationCodeResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /auth/forgotPassword:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Forgot password
 *     security: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/ForgotPasswordInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ForgotPasswordResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /auth/resetPassword:
 *   post:
 *     tags:
 *       - Auth
 *     name: Forgot Password
 *     summary: Forgot password
 *     security: []
 *     parameters:
 *      - name: passwordResetCode
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/ResetPasswordInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResetPasswordResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /auth/newPassword:
 *   post:
 *     tags:
 *       - Auth
 *     name: Forgot Password
 *     summary: Forgot password
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/NewPasswordInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewPasswordResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get user by access token
 *     security:
 *       - cookieAuth: []
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUserResponse'
 */

/**
 * @swagger
 * /auth/token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Regenerate token
 *     security: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/NewTokenInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewTokenResponse'
 */

/**
 * @swagger
 * /auth/token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Regenerate token
 *     security: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/NewTokenInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewTokenResponse'
 */

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

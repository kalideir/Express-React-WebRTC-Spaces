/**
 * @swagger
 * components:
 *  schemas:
 *    RegisterUserInput:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: user@email.com
 *        username:
 *          type: string
 *          default: username
 *        password:
 *          type: string
 *          default: password
 *    RegisterUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    LoginInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: user@email.com
 *        password:
 *          type: string
 *          default: password
 *    LoginResponse:
 *        type: object
 *        properties:
 *          accessToken:
 *            type: string
 *          refreshToken:
 *            type: string
 *          _id:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ResendVerificationCodeInput:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *    ResendVerificationCodeResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          fullName:
 *            type: string
 *          _id:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      VerifyUserResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          fullName:
 *            type: string
 *          _id:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ForgotPasswordInput:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *    ForgotPasswordResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          fullName:
 *            type: string
 *          _id:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ResetPasswordInput:
 *      type: object
 *      required:
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        password:
 *          type: string
 *        passwordConfirmation:
 *          type: string
 *    ResetPasswordResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          fullName:
 *            type: string
 *          _id:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewPasswordInput:
 *      type: object
 *      required:
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        password:
 *          type: string
 *        passwordConfirmation:
 *          type: string
 *    NewPasswordResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          fullName:
 *            type: string
 *          _id:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    NewTokenInput:
 *      type: object
 *      required:
 *        - refreshToken
 *      properties:
 *        refreshToken:
 *          type: string
 *    NewTokenResponse:
 *        type: object
 *        properties:
 *          token:
 *            type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateMediaInput:
 *      type: object
 *      required:
 *        - type
 *        - file
 *        - contentType
 *      properties:
 *        type:
 *          type: string
 *        contentType:
 *          type: string
 *        file:
 *          type: string
 *          format: binary
 *    CreateMediaResponse:
 *      type: object
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    GetUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        phoneNumber:
 *          type: string
 *        address:
 *          type: string
 *        birthdate:
 *          type: string
 *        profilePicture:
 *          type: string
 *        role:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateUserInput:
 *      type: object
 *    UpdateUserResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 *          phoneNumber:
 *            type: string
 *          profilePicture:
 *            type: string
 *          id:
 *            type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ListUsersResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        phoneNumber:
 *          type: string
 *        address:
 *          type: string
 *        birthdate:
 *          type: string
 *        profilePicture:
 *          type: string
 *        role:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateUserInput:
 *      type: object
 *    UpdateUserResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 *          phoneNumber:
 *            type: string
 *          profilePicture:
 *            type: string
 *          id:
 *            type: string
 */

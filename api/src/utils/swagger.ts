import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';
import config from 'config';

const cookieName = config.get<string>('cookieName');

const swaggerOptions: swaggerJsdoc.Options = {
  explorer: true,
  swaggerDefinition: {
    openapi: '3.0.1',
    servers: [
      {
        url: `/api/`,
      },
    ],
    info: {
      title: 'Express Starter API',
      description: 'Express Starter API Information',
      version,
      contact: {
        name: 'kalider',
        email: 'ali.h.kudeir@gmail.com',
      },
    },
    tags: [
      {
        name: 'Auth',
        description: 'Login, Register, Passowrd, Verification and Me',
      },
    ],
    definitions: {
      Token: {
        type: 'object',
        properties: {
          tokenType: {
            type: 'string',
          },
          accessToken: {
            type: 'string',
          },
          refreshToken: {
            type: 'string',
          },
          expiresIn: {
            type: 'date',
          },
        },
      },
    },
    components: {
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
        ValidationError: {
          description: 'Validation error',
        },
        NotFoundError: {
          description: 'Not found error',
        },
      },
      securitySchemes: {
        [cookieName]: {
          // authCookie
          type: 'apiKey',
          in: 'cookie',
          name: [cookieName],
        },
      },
    },
    security: [cookieName],
  },
  apis: ['./src/swagger/**/*.ts'],
};

export default swaggerOptions;

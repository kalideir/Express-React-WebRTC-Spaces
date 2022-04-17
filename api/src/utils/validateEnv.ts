import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    DB_URI: str(),
    REDIS_URL: str(),
    EMAIL_USER: str(),
    EMAIL_PASS: str(),
    EMAIL_HOST: str(),
    EMAIL_PORT: str(),
    EMAIL_IS_SECURE: str(),
    JWT_SECRET: str(),
    AWS_ACCESS_ID: str(),
    AWS_SECRET_KEY: str(),
    AWS_S3_BUCKET_NAME: str(),
  });
};

export default validateEnv;

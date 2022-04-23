import express, { Request, Response } from 'express';
import compress from 'compression';
import morgan from 'morgan';
import responseTime from 'response-time';
import routes from './routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import cookieSession from 'cookie-session';
import helmet from 'helmet';
import i18n from 'i18next';
import i18nBackend from 'i18next-fs-backend';
import i18nMiddleware from 'i18next-http-middleware';
import { error } from './middleware';
import initializedPassport from './auth';
import { MORGAN_TOKENS, stream } from './utils';
import config from 'config';
import { restResponseTimeHistogram, startMetricsServer } from './metrics';
// import listRoutes from 'express-list-routes';

i18n
  .use(i18nBackend)
  .use(i18nMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
  });

const app = express();

app.use(morgan(MORGAN_TOKENS, { stream }));

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000,
      );
    }
  }),
);

app.use(cookieParser());

app.use(express.json());

app.use(compress());

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(helmet());

app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);

app.use(i18nMiddleware.handle(i18n));

app.use(
  cookieSession({
    name: config.get<string>('cookieName'),
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.get<string>('cookieKey1')],
  }),
);

initializedPassport(app);

app.use('/api/', routes);

app.use(error);

// listRoutes(routes, { prefix: '/api/' });
startMetricsServer();

export default app;

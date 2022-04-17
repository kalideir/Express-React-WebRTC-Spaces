import express from 'express';
import httpStatus from 'http-status';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import mediaRoutes from './media.route';
import swaggerRoutes from './swagger.route';
const router = express.Router();

/**
 * Health check
 */
router.get('/healthCheck', (req, res) => {
  res.sendStatus(httpStatus.OK);
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/media', mediaRoutes);
router.use('/swagger', swaggerRoutes);

export default router;

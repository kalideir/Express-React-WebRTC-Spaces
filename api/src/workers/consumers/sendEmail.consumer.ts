import { logger, sendEmail } from '../../utils';
import { SendEmailJobData } from '../../types';
import { Job } from 'bull';

export default function consumer(job: Job<SendEmailJobData>) {
  return new Promise((resolve, reject) => {
    const data = job.data;
    logger.debug('Email job data ' + data);
    const { emailOptions, context, template } = data;
    try {
      sendEmail(emailOptions, context, template);
      resolve(true);
    } catch (e) {
      logger.error(e);
      reject(e);
    }
  });
}

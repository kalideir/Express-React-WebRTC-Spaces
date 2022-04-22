import { DoneCallback, Job } from 'bull';
import { logger, sendEmail } from '../../utils';
import { sendMailQueue } from '../bull';
import { SendEmailJobData } from '../../types';

export type SendEmailContext = {
  description: string;
  actionUrl: string;
  btnText: string;
  action: string;
  subject: string;
  message: string;
};

sendMailQueue.process(async (job: Job<SendEmailJobData>, done: DoneCallback) => {
  logger.debug('Job data ' + job.data);
  await consumer(job.data);
  done();
});

export default function consumer(jobData: SendEmailJobData) {
  return new Promise((resolve, reject) => {
    const { emailOptions, context, template } = jobData;
    try {
      sendEmail(emailOptions, context, template);
      resolve(true);
    } catch (e) {
      logger.error(e);
      reject(e);
    }
  });
}

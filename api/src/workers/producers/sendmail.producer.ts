import { sendMailQueue } from '..';
import { SendEmailJobData } from '../../types';

export default function (emailData: SendEmailJobData) {
  const opts = {
    attempts: 1,
  };
  sendMailQueue.add(emailData, opts);
}

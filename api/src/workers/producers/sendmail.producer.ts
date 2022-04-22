import { SendEmailJobData } from '../../types';
import { sendMailQueue } from '../bull';

export default function (emailData: SendEmailJobData) {
  const opts = {
    attempts: 10,
  };
  sendMailQueue.add(emailData, opts);
}

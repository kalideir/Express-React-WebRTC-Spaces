import { SendMailOptions } from 'nodemailer';
import { SendEmailContext } from '../../utils/mailer';
import { sendMailQueue } from '../bull';

export default function (emailOptions: SendMailOptions, context: SendEmailContext) {
  const data = { emailOptions, context };
  const opts = {
    attempts: 1,
  };
  sendMailQueue.add(data, opts);
}

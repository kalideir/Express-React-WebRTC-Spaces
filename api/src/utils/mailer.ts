import nodemailer, { SendMailOptions } from 'nodemailer';
import config from 'config';
import { logger } from '.';
import hbs from 'nodemailer-express-handlebars';
import { SendMailContext, EmailTemplate } from '../types';

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>('email');

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
});

transporter.verify(function (error) {
  if (error) {
    logger.error(error);
  } else {
    logger.info('SMTP server is ready to send messages');
  }
});

/**
 *    from: '"*** <***gmail.com>',
      to: "***@gmail.com",
      subject: `***`,
 */

async function sendEmail(options: SendMailOptions, context: SendMailContext, template: EmailTemplate) {
  logger.debug({ options, context });
  const handlebarOptions = {
    viewEngine: {
      extname: '.hbs',
      layoutsDir: 'src/views/emails/',
      defaultLayout: template || 'email',
    },
    viewPath: 'src/views/emails',
    extName: '.hbs',
  };

  transporter.use('compile', hbs(handlebarOptions));

  const payload = {
    ...options,
    from: smtp.user,
    template,
    context,
  };
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      console.log({ err });
      logger.error(err);
      return;
    }

    logger.info(`SMTP : Mail Sent -> ${JSON.stringify(info)}`);
  });
}

export default sendEmail;

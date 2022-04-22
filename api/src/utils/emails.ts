import { SendEmailJobData } from '../types';
import config from 'config';

const clientUrl = config.get<string>('clientUrl');

export function registerEmailData(to: string, verificationCode: string): SendEmailJobData {
  const emailOptions = {
    to,
    subject: 'Your account was created successfully',
  };
  const context = {
    description: 'Please visit the link below to verify your account.',
    action: 'Verify Account',
    actionUrl: `${clientUrl}/verify-account/${verificationCode}`,
  };
  return { emailOptions, context, template: 'register' };
}

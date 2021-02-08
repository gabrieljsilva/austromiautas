import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { createTransport } from 'nodemailer';
import { renderFile } from 'ejs';
import { join } from 'path';

import * as SMTP_CONFIG from '../../shared/smtp/config';

import { confirmAccountParams } from './templates/confirmAccount';
import { SendMailOptions } from './interfaces/SendMailOptions';

@Processor('email')
export class EmailProcessor {
  private transporter = createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
      user: SMTP_CONFIG.user,
      pass: SMTP_CONFIG.pass,
    },
  });

  private emailTemplatesDir = join(process.cwd(), 'src', 'app', 'emails', './templates');

  private async renderTemplate(template: string, data: unknown) {
    return await renderFile(join(this.emailTemplatesDir, template), data);
  }

  @Process('sendConfirmAccountEmail')
  async sendConfirmAccountEmail(job: Job<SendMailOptions<confirmAccountParams>>) {
    const { data } = job;
    const { params, from, to, subject } = data;

    const html = await this.renderTemplate('confirmAccount/index.ejs', params);
    await this.transporter.sendMail({ from, to, subject, html });
  }
}

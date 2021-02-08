import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { confirmAccountParams } from './templates/confirmAccount';

import { SendMailOptions } from './interfaces/SendMailOptions';

@Injectable()
export class EmailsService {
  constructor(@InjectQueue('email') private readonly mailQueue: Queue) {}

  async sendConfirmAccountEmail(to: string, params: confirmAccountParams) {
    const mailOptions: SendMailOptions<confirmAccountParams> = {
      subject: 'Confirm Your Account',
      from: 'austromiautas@email.com',
      to,
      params,
    };
    return this.mailQueue.add('sendConfirmAccountEmail', mailOptions);
  }
}

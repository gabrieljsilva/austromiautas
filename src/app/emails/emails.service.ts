import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { HelloParams } from './templates/hello';
import { SendMailOptions } from './interfaces/SendMailOptions';

@Injectable()
export class EmailsService {
  constructor(@InjectQueue('email') private readonly mailQueue: Queue) {}

  async sendHelloMail(to: string, params: HelloParams) {
    const mailOptions: SendMailOptions<HelloParams> = {
      subject: 'hello',
      from: 'my@email.com',
      to,
      params,
    };
    return this.mailQueue.add('sendHelloMail', mailOptions);
  }
}

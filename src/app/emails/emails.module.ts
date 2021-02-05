import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { EmailsService } from './emails.service';
import { EmailProcessor } from './emails.processor';

const MailQueueModule = BullModule.registerQueue({
  name: 'email',
});

@Global()
@Module({
  imports: [MailQueueModule],
  providers: [EmailsService, EmailProcessor],
  exports: [MailQueueModule],
})
export class EmailsModule {}

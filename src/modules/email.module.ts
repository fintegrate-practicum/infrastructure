import { Module } from '@nestjs/common';
import { EmailService } from '../services/email.service';
import { MessageService } from '../services/message.service';
import { EmailLogModule } from 'src/email-log/module/email-log.module';
@Module({
  imports: [EmailLogModule],
  providers: [EmailService, MessageService],
  exports: [EmailService],
})
export class EmailModule {}

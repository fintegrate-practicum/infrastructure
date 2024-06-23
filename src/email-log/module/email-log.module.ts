import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailLog, EmailLogSchema } from '../schemas/email-log.schema';
import { EmailLogController } from '../controllers/email-log.controller';
import { EmailLogService } from '../services/email-log.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailLog.name, schema: EmailLogSchema },
    ]),
  ],
  providers: [EmailLogService],
  controllers: [EmailLogController],
  exports: [EmailLogService],
})
export class EmailLogModule {}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MailerService } from '@nestjs-modules/mailer';

@Module({
  imports: [HttpModule],
  providers: [MailerService],
})
export class MailModule{}

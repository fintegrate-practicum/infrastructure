import { Injectable, Logger } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import { ConfigService } from '@nestjs/config';
import { EmailLogService } from '../email-log/services/email-log.service';
import {
  CreateEmailLogDto,
  UpdateEmailLogDto,
} from '../email-log/dto/email-log.dto';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private mailgun;

  constructor(
    private readonly emailLogService: EmailLogService,
    private readonly configService: ConfigService,
  ) {
    this.mailgun = mailgun({
      apiKey: this.configService.get<string>('MAILGUN_API_KEY'),
      domain: this.configService.get<string>('MAILGUN_DOMAIN'),
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    html: string,
    kindSubject: string,
    businessId: string,
  ) {
    const createEmailLogDto: CreateEmailLogDto = {
      status: 'sent',
      kindSubject,
      businessId,
      recipient: to,
      timestamp: new Date(),
    };

    const emailLog = await this.emailLogService.create(createEmailLogDto);

    const data = {
      from: this.configService.get<string>('MAILGUN_EMAIL'),
      to,
      subject,
      html,
    };

    try {
      await this.mailgun.messages().send(data);
      this.logger.log('Email sent successfully');

      const updateEmailLogDto: UpdateEmailLogDto = {
        status: 'sent',
      };
      await this.emailLogService.update(
        emailLog.businessId, // אין צורך בהמרה ל-string, כבר מחרוזת
        updateEmailLogDto,
      );
    } catch (error) {
      this.logger.error('Error sending email:', error);

      const updateEmailLogDto: UpdateEmailLogDto = {
        status: 'failed',
        errorMessage: error.message,
      };
      await this.emailLogService.update(emailLog.businessId, updateEmailLogDto);
    }
  }
}

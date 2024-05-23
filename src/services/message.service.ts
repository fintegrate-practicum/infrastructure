import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Message, MessageType } from '../interface/message.interface';
import { EmailService } from './email.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MessageService implements OnModuleInit {
  private readonly logger = new Logger(MessageService.name);
  private emailContent: string;

  constructor(private readonly mailerService: EmailService) { }

  onModuleInit() {
    try {
      const htmlFilePath = path.join(__dirname, '..', 'src', 'Employee invitation email', 'Employee invitation email.html');
      const emailContent = fs.readFileSync(htmlFilePath, 'utf-8');
    } catch (error) {
      this.logger.error('Failed to read email content file', error.stack);
    }
  }

  async sendMessage(message: Message): Promise<void> {
    switch (message.type) {
      case MessageType.Email:
        await this.sendEmail(message);
        break;
      case MessageType.Sms:
        await this.sendSms(message);
        break;
      default:
        throw new Error(`Unsupported message type: ${message.type}`);
    }
  }

  private async sendEmail(message: Message): Promise<void> {
    try {
      const { to, subject } = message;
      await this.mailerService.sendEmail(to, subject, this.emailContent);
      this.logger.log(`Email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${message.to}`, error.stack);
      throw error;
    }
  }

  private async sendSms(message: Message): Promise<void> {
    try {
      const { to } = message;
      const data = {
        to,
        emailContent: this.emailContent,
      };
      this.logger.log(`SMS data prepared for ${to}`, data);
    } catch (error) {
      this.logger.error(`Failed to send SMS to ${message.to}`, error.stack);
      throw error;
    }
  }
}

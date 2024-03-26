import { Injectable } from '@nestjs/common';
import { mailgunClient } from '../config/mailgun.config';
import { Message, MessageType } from '../interface/message.interface';
import { MailService } from './mail.service';

@Injectable()
export class MessageService {
  constructor( private readonly mailerService: MailService) {}

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
    await this.mailerService.sendMail();
  }

  private async sendSms(message: Message): Promise<void> {
    const { to, text } = message;
    const data = {
      from: 'Your Mailgun phone number', // Replace with your Mailgun phone number
      to,
      text,
    };
    await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN, data);
  }
}

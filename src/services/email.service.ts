import { Injectable } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
require('dotenv').config();

@Injectable()
export class EmailService {

  private mailgun = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

  async sendEmail(to: string, subject: string, text: string) {

    const data = {
      from: process.env.MAILGUN_EMAIL,
      to,
      subject,
      text,
    };

    try {
      await this.mailgun.messages().send(data);
      console.log('email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }

  }
}








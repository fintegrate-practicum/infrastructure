import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
@Injectable()
export class MailService {
  private mailgun: any;

  constructor() {
    const formData = new FormData();
    this.mailgun = this.mailgun(formData);
  }

  async sendEmail(from: string, to: string[], subject: string, text: string, html: string) {
    const mg = this.mailgun.client({
      username: 'fintegrate',
      key: process.env.MAILGUN_API_KEY,
    });

    try {
      const msg = await mg.messages.create('fintegrate.domain', {
        from: 'fintegrate@sandbox-123.mailgun.org',//Using the diplot domain, so that's how the email address will look
        to: to,
        subject: subject,
        text: text,
        html: html,
      });
      console.log(msg);
    } catch (err) {
      console.log(err);
    }
  }
}

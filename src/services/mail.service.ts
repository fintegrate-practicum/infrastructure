import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import FormData from 'form-data';

@Injectable()
export class MailService{
  constructor(private httpService: HttpService) {}

  async sendMail() {
    const formData = new FormData();
    formData.append('from', 'Excited User <mailgun@sandbox-123.mailgun.org>');
    formData.append('to', 'test@example.com');
    formData.append('subject', 'Hello');
    formData.append('text', 'Testing some Mailgun awesomeness!');
    formData.append('html', '<h1>Testing some Mailgun awesomeness!</h1>');

    try {
      const response = await this.httpService.post('https://api.mailgun.net/v3/sandbox-123.mailgun.org/messages', formData, {
        auth: {
          username: 'api',
          password: process.env.MAILGUN_API_KEY || 'key-yourkeyhere',
        },
        headers: {
          ...formData.getHeaders(),
          'Content-Type': 'multipart/form-data',
        },
      }).toPromise();

    } catch (error) {
      console.error('Error sending email:', error.message);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { MessageService } from '../message.service';
import { Message, MessageType } from '../../interface/message.interface';
import { TaskMessage } from 'src/interface/task-message.interface';
import { readFile } from 'fs/promises';

@Injectable()
//הhtml פונקציה זו בודקת מה הסוג הודעה ולפי זה היא מפעילה פונקציה מתאימה שמחזירה את
// ואז היא מפעילה את הפונקציה של שליחת המייל
export class MailBridgeService {
  constructor(private readonly messageService: MessageService) { }

  private async sendNewEmployeeEmail(message: any): Promise<string> {
    try {
      const filePath =
        'src/EmployeeInvitationEmail/EmployeeInvitationEmail.html';
      const htmlContent = await readFile(filePath, 'utf-8');
      const personalizedHtml = htmlContent
        .replace("[candidate's name]", message.name)
        .replace('[job title]', message.jobTitle)
        .replace('[Invitation Link]', message.invitationLink);
      return personalizedHtml;
    } catch (error) {
      console.error('Error reading HTML file:', error);
      throw new Error('Failed to read HTML file for new employee email');
    }
  }

  async handleMessage(message: any): Promise<void> {
    let htmlContent: string;

    try {
      switch (message.kindSubject) {
        case 'message':
          htmlContent = await this.messageHtml(
            message.to,
            message.subject,
            message.text,
          );
        case 'send-code':
          htmlContent = await this.sendCodeHtml(
            message.to,
            message.subject,
            message.text,
            message.code,
          );
          break;
        case 'newTask':
          htmlContent = await this.messageHtmlNewTask(message);
          break;

        case 'orderMessage':
          htmlContent = this.orderMessageHtml(
            message.to,
            message.numOrder,
            message.nameBussniesCode,
            message.dateOrder,
            message.city,
            message.street,
            message.numBuild
          )
          break;
        // אפשר להוסיף כאן מקרים נוספים
        case 'new Employee':
          htmlContent = await this.sendNewEmployeeEmail(message);
          break;

        default:
          throw new Error(`Unknown kindSubject: ${message.kindSubject}`);
      }
    } catch (error) {
      console.error('Error generating HTML content:', error);
      htmlContent = 'Default HTML content';
    }

    const formattedMessage: Message = {
      to: message.to,
      subject: message.subject,
      html: htmlContent,
      type: MessageType.Email,
      kindSubject: message.kindSubject,
      businessId: message.businessId,
    };
    await this.messageService.sendMessage(formattedMessage);
  }

  private messageHtml(to: string, subject: string, text: string): string {
    //פה מחזירים איך רוצים שההודעה תראה במייל, html
    return `
        <h1>${subject}</h1>
        <p>Hello ${to},</p>
        <p>${text}</p>
        <p>How are you?</p>
        <p>Best regards,</p>
        <p>RabbitMq</p>
      `;
  }
  private sendCodeHtml(
    to: string,
    subject: string,
    text: string,
    code: string,
  ): string {
    return `
        <h1>${subject}</h1>
        <p>Hello ${to},</p>
        <p>${text}</p>
        <p>This is your verification code</p>
        <p>${code}</p>
        `;
  }

  private messageHtmlNewTask(message: TaskMessage): string {
    return `
        <h1>Assign a new task-${message.subject}</h1>
        <h2>hello ${message.name}</h2>
        <h2>A new task has been assigned for you:${message.subject}</h2>
        <p>Mission description:
        ${message.description}
        </p>
        <h2>Due Date: ${message.date}</h2>
        <p>
        Please let me know if you have any questions about the assignment.</br>
        I trust you to carry out the task in the best possible way.</br>
        Successfully,
        </p>
        <h2>${message.managerName}</h2>

      `;
  }
  private orderMessageHtml(to: string, numOrder: string, nameBussniesCode: string, dataOrder: string, city: string,
    street: string, numBuild: number): string {
    return ` 
    <p><strong>Subject: Your Order Confirmation from ${nameBussniesCode}</strong></p>

    <p>Hello ${to},</p>

    <p>Thank you very much for your order from ${nameBussniesCode}! We are pleased to inform you that we have received your order, and it is currently being processed.</p>

    <p><strong>Order Details:</strong></p>
    <ul>
        <li>Order Number: ${numOrder}</li>
        // <li>Order Date: ${dataOrder}</li>

        <li>Total Price: [Total Price]</li>
    </ul>

    <p><strong>Shipping Details:</strong></p>
    <ul>
        <li>Recipient Name: ${to}</li>
        <li>Shipping Address: ${city} ${street} ${numBuild}</li>
    </ul>

    <p>We will send you another update once your order is on its way. If you have any further questions, please do not hesitate to contact us.</p>


    <p>Thank you for choosing ${nameBussniesCode}. We appreciate your trust in us and look forward to serving you again in the future.</p>

    <p>Best regards,<br>
    The ${nameBussniesCode} Team</p>
`
  }
}
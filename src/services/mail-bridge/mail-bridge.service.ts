import { Injectable } from '@nestjs/common';
import { MessageService } from '../message.service';
import { Message, MessageType } from '../../interface/message.interface';
import { log } from 'handlebars';
import { TaskMessage } from 'src/interface/task-message.interface';

@Injectable()
//הhtml פונקציה זו בודקת מה הסוג הודעה ולפי זה היא מפעילה פונקציה מתאימה שמחזירה את
// ואז היא מפעילה את הפונקציה של שליחת המייל
export class MailBridgeService {
  constructor(private readonly messageService: MessageService) { }
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
          break;
        // אפשר להוסיף כאן מקרים נוספים
        case 'newTask':
          htmlContent = await this.messageHtmlNewTask(
            message
          );
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
}

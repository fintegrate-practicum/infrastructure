// import { Injectable } from '@nestjs/common';
// import { MessageService } from '../message.service';
// import { Message, MessageType } from '../../interface/message.interface';

// @Injectable()
// //פונקציה זו מפעילה עבור כל סוג הודעה את הפוקנציה המתאימה לו
// export class MailBridgeService {
//   constructor(private readonly messageService: MessageService) {}
//   handleMessage(message: any): void {
//     switch (message.kindSubject) {
//       case 'message':
//         this.sendMessagetoEmail(message);
//         break;
//       default:
//         console.log('Unknown message type:', message.kindSubject);
//     }
//   }

//   private async sendMessagetoEmail(message: any): Promise<void> {
//     const formattedMessage: Message = {
//       to: message.to,
//       subject: message.subject,
//       html: this.generateMessageHtml(message.to, message.subject, message.text),
//       type: MessageType.Email,
//       kindSubject: message.kindSubject,
//     };
//     await this.messageService.sendMessage(formattedMessage);
//   }

//   private generateMessageHtml(
//     to: string,
//     subject: string,
//     text: string,
//   ): string {
//     //פה מחזירים איך רוצים שההודעה תראה במייל, html
//     //הפרטים פה מומצאים רק בשביל הרעיון אבל צריך לשלוח אותם בהודעה עצמה
//     return `
//         <h1>${subject}</h1>
//         <p>Hello ${to},</p>
//         <p>${text}</p>
//         <p>How are you?</p>
//         <p>Best regards,</p>
//         <p>RabbitMq</p>
//       `;
//   }
// }


import { Injectable } from '@nestjs/common';
import { MessageService } from '../message.service';
import { Message, MessageType } from '../../interface/message.interface';

@Injectable()
//הhtml פונקציה זו בודקת מה הסוג הודעה ולפי זה היא מפעילה פונקציה מתאימה שמחזירה את  
// ואז היא מפעילה את הפונקציה של שליחת המייל
export class MailBridgeService {
  constructor(private readonly messageService: MessageService) {}
  async handleMessage(message: any): Promise<void> {
   
    let htmlContent: string;
    try {
      switch (message.kindSubject) {
        case 'message':
          htmlContent = await this.generateMessageHtml(message.to, message.subject, message.text);
          break;
        // אפשר להוסיף כאן מקרים נוספים 
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

  private generateMessageHtml(
    to: string,
    subject: string,
    text: string,
  ): string {
    //פה מחזירים איך רוצים שההודעה תראה במייל, html
    //הפרטים פה מומצאים רק בשביל הרעיון אבל צריך לשלוח אותם בהודעה עצמה
    return `
        <h1>${subject}</h1>
        <p>Hello ${to},</p>
        <p>${text}</p>
        <p>How are you?</p>
        <p>Best regards,</p>
        <p>RabbitMq</p>
      `;
  }
}


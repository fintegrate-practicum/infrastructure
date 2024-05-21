import { Injectable } from '@nestjs/common';
import { MessageService } from '../message.service';
import { Message,MessageType } from '../../interface/message.interface';

@Injectable()
//פונקציה זו מפעילה עבור כל סוג הודעה את הפוקנציה המתאימה לו
export class RabbitMailService {
  constructor(private readonly messageService: MessageService) {}
    handleMessage(message: any): void {
        switch(message.kindSubject){
            case 'message':
              this.sendMessageToMessage(message);
                break;  
            default:
              console.log('Unknown message type:', message.kindSubject);
        }
    }

    
    private async sendMessageToMessage(message: any): Promise<void> {
      const formattedMessage: Message = {
        to: message.to,
        subject: 'New Message',
        html: this.generateMessageHtml(
          message.to,
          message.jobTitle,
          message.candidateName,
          message.relevantEducation,
          message.yearsOfExperience,
          message.relevantFieldsOfKnowledge,
          message.relevantQualifications,
          message.positiveQualities,
          message.candidatePhone,
          message.candidateEmail
        ),
        type: MessageType.Email,
        kindSubject: message.kindSubject,
      };
      await this.messageService.sendMessage(formattedMessage);
    }
  
    private generateMessageHtml(
      recipient: string,
      jobTitle: string,
      candidateName: string,
      relevantEducation: string,
      yearsOfExperience: string,
      relevantFieldsOfKnowledge: string,
      relevantQualifications: string,
      positiveQualities: string,
      candidatePhone: string,
      candidateEmail: string
    ): string {
      //פה מחזירים איך רוצים שההודעה תראה במייל, html
      //הפרטים פה מומצאים רק בשביל הרעיון אבל צריך לשלוח אותם בהודעה עצמה
      return `
        <h1>CV Receipt Notification</h1>
        <p>Hello ${candidateName},</p>
        <p>Thank you for accepting my resume for the ${jobTitle} position at ${recipient}.</p>
        <p>I am ${candidateName}, possessing ${relevantEducation} and ${yearsOfExperience} of experience in ${relevantFieldsOfKnowledge}. During my work, I gained knowledge in the following areas: ${relevantQualifications}.</p>
        <p>Additionally, I have many qualifications, including: ${positiveQualities}. I am a person with ${positiveQualities} and highly motivated to learn and develop. I am sure that I can contribute a lot to the company and the team.</p>
        <p>I would be very happy to meet you and tell you more about myself and my experience.</p>
        <p>Best regards,</p>
        <p>${candidateName}</p>
        <p>Contact info:</p>
        <p>Phone: ${candidatePhone}</p>
        <p>Email: ${candidateEmail}</p>
      `;
    }
  }
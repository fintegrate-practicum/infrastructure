export interface Message {
    to: string;
    subject?: string;
    text: string; 
    html?: string;
    type: MessageType; 
  }
  
  export enum MessageType {
    Email = 'email',
    Sms = 'sms',
  }
  
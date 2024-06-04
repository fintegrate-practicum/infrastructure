export interface Message {
  to: string;
  subject?: string;
  text?: string;
  html: string;
  type: MessageType;
  kindSubject: string;
  code?:string
}
export enum MessageType {
  Email = 'email',
  Sms = 'sms',
}

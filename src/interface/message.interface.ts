export interface Message {
  to: string;
  subject?: string;
  text?: string;
  html: string;
  type: MessageType,
  kindSubject: string,
  numOrder?:string,
  nameBussniesCode?:string
}
export enum MessageType {
  Email = 'email',
  Sms = 'sms',
}

export interface Message {
  to: string;
  subject?: string;
  text?: string;
  name?: string;
  // html: string;
  type: MessageType;
  invitationLink: string;
}

export enum MessageType {
  Email = 'email',
  Sms = 'sms',
}

export interface Message {
  to: string;
  subject?: string;
  text?: string;
  name?: string;
  html: string;
  type: MessageType,
  kindSubject: string,
  numOrder?: string,
  nameBussniesCode?: string,
  dateOrder?: Date,
  city?: string,
  street?: string,
  numBuild?: number
  invitationLink?: string;
  jobTitle?: string;
}
export enum MessageType {
  Email = 'email',
  Sms = 'sms',
}

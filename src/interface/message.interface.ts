export interface Message {
  to: string;
  subject?: string;
  text?: string;
  name?: string;
  html: string;
  numOrder?: string,
  nameBussniesCode?: string,
  dateOrder?: string,
  city?: string,
  street?: string,
  numBuild?: number
  type: MessageType;
  invitationLink?: string;
  jobTitle?: string;
  kindSubject: string;
}
export enum MessageType {
  Email = 'email',
  Sms = 'sms',
}

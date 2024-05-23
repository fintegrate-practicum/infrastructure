export interface Message {
  to: string;
  subject?: string;
  text?: string;
  email?: string;
  // html: string;
  type: MessageType;
  payload: {
    employeeEmail: string;
    invitationLink: string;
  };
}

export enum MessageType {
  Email = 'email',
  Sms = 'sms',
}

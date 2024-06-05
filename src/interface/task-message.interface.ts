export interface TaskMessage {
    subject: string;
    name: string;
    description: string;
    date: Date; // Assuming date should be a Date object
    managerName: string;
  }
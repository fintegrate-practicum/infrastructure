import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationSettingsDocument = NotificationSettings & Document;

@Schema()
export class NotificationSettings {
  @Prop({ default: true })
  sendRecruitmentNotification: boolean;

  @Prop({ default: true })
  sendCVReceiptNotification: boolean;

  @Prop({ default: true })
  sendInterviewConfirmation: boolean;

  @Prop({ default: true })
  sendRecruitmentStatusUpdate: boolean;

  @Prop({ default: true })
  sendTaskAssignment: boolean;

  @Prop({ default: true })
  sendTaskStatusUpdate: boolean;

  @Prop({ default: true })
  sendApprovalRequest: boolean;

  @Prop({ default: true })
  sendFeedbackToEmployee: boolean;

  @Prop({ default: true })
  sendNewCourseNotification: boolean;

  @Prop({ default: true })
  sendTrainingInvitation: boolean;

  @Prop({ default: true })
  sendTrainingStatusUpdate: boolean;

  @Prop({ default: true })
  sendAttendanceReportUpdate: boolean;

  @Prop({ default: true })
  sendSalaryCalculationUpdate: boolean;

  @Prop({ default: true })
  sendPaymentTransferConfirmation: boolean;
}

export const NotificationSettingsSchema = SchemaFactory.createForClass(NotificationSettings);
import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Message, Ctx, Bind, RmqContext } from 'amqplib';
import { EmailService } from '../email.service';
@Injectable()
export class RabbitConsumerService {
  constructor(private readonly emailService: EmailService) { }

  @MessagePattern('message_queue')
  async handleEvent(@Payload() message: Message, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    console.log('Received message:', message.content.toString());
    // טיפול בהודעה כאן

    // Parse the message content to JSON
    const messageData = JSON.parse(message.content.toString());
    // Extract employee details from the message

    const employeeName = messageData.employeeName;
    const employeeEmail = messageData.employeeEmail;
    const invitationLink = messageData.invitationLink;

    // Send the email
    await this.emailService.sendEmail(employeeEmail, 'Welcome to Our Company!', emailContent)

    // Acknowledge the message
    channel.ack(originalMsg);
  }
}









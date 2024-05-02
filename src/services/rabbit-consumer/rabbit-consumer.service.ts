import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Message,Ctx,Bind,RmqContext } from 'amqplib';

@Injectable()
export class RabbitConsumerService {
  @MessagePattern('message_queue')
  async handleEvent(@Payload() message: Message) {
    console.log('Received message:', message.content.toString());
    // טיפול בהודעה כאן
  }
}












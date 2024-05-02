import { EventPattern } from '@nestjs/microservices';
import { MessagePattern,Payload} from '@nestjs/microservices';
import { Message } from 'amqplib';
import { Controller } from '@nestjs/common';
import { log } from 'console';

import { RabbitConsumerService } from './services/rabbit-consumer/rabbit-consumer.service';
import {Post, Body } from '@nestjs/common';


//שלי
@Controller()
export class AppController {
  constructor() {}
@MessagePattern('message_queue') 
async handleEvent(@Payload() message: Message) {
  console.log('Received message:', message);
  // טיפול בהודעה כאן
}
}




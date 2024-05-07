import { EventPattern } from '@nestjs/microservices';
import { MessagePattern,Payload} from '@nestjs/microservices';
import { Message } from 'amqplib';
import { Controller } from '@nestjs/common';
import { log } from 'console';

@Controller()
export class AppController {
  constructor() {}
@MessagePattern('message_queue') 
async handleEvent(@Payload() message: Message) {
  console.log('Received message:', message);
  // טיפול בהודעה כאן

}
}




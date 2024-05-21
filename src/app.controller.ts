import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import {MessageService} from './services/message.service';
import { Message, MessageType } from './interface/message.interface';
import { RabbitMailService } from './services/rabbit-mail/rabbit-mail.service';

@Controller()
export class AppController {
  constructor(private readonly MessageService: MessageService,private readonly handleMessage:RabbitMailService) {}

  @MessagePattern('message_queue')
  async handleEvent(@Payload() message: Message) {
     await this.handleMessage.handleMessage(message);
    //take care of message 
  }
}

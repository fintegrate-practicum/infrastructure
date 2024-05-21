import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import {MessageService} from './services/message.service';
import { Message, MessageType } from './interface/message.interface';

@Controller()
export class AppController {
  constructor(private readonly MessageService: MessageService) {
  }

  @MessagePattern('message_queue')
  async handleEvent(@Payload() message: Message) {
     await this.MessageService.sendMessage(message);
    //take care of message 
  }
}

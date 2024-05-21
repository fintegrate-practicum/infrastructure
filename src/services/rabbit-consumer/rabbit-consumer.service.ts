import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {MessageService} from '../message.service';
import { Message, MessageType } from '../../interface/message.interface';


@Injectable()
export class RabbitConsumerService {
  @MessagePattern('message_queue')
  async handleEvent(message:Message) {
  }
}

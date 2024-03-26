import { Body, Controller, Post } from '@nestjs/common';
import { Message } from 'src/interface/message.interface';
import { MessageService } from 'src/services/message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async sendMessage(@Body() message: Message): Promise<void> {
    await this.messageService.sendMessage(message);
  }
}

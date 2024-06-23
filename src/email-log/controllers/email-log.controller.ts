import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { EmailLogService } from '../services/email-log.service';
import { EmailLog } from '../schemas/email-log.schema';
import { CreateEmailLogDto } from '../dto/email-log.dto';
import { UpdateEmailLogDto } from '../dto/email-log.dto';

@Controller('email-log')
export class EmailLogController {
  constructor(private readonly emailLogService: EmailLogService) {}

  @Get()
  async findAll(): Promise<EmailLog[]> {
    return this.emailLogService.findAll();
  }
  @Post()
  async create(
    @Body() CreateEmailLogDto: CreateEmailLogDto,
  ): Promise<EmailLog> {
    return this.emailLogService.create(CreateEmailLogDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmailLogDto: UpdateEmailLogDto,
  ) {
    return this.emailLogService.update(id, updateEmailLogDto);
  }
}

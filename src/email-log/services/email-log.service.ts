import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailLog } from '../schemas/email-log.schema';
import { CreateEmailLogDto } from '../dto/email-log.dto';
import { UpdateEmailLogDto } from '../dto/email-log.dto';

@Injectable()
export class EmailLogService {
  constructor(
    @InjectModel(EmailLog.name) private emailLogModel: Model<EmailLog>,
  ) {}

  async create(createEmailLogDto: CreateEmailLogDto): Promise<EmailLog> {
    const createEmailLog = new this.emailLogModel(createEmailLogDto);
    return createEmailLog.save();
  }

  async findAll(): Promise<EmailLog[]> {
    return this.emailLogModel.find().exec();
  }

  async update(
    id: string,
    updateEmailLogDto: UpdateEmailLogDto,
  ): Promise<EmailLog> {
    return this.emailLogModel.findByIdAndUpdate(id, updateEmailLogDto, {
      new: true,
    });
  }
  // async update(id: string, UpdateEmailLogDto: UpdateEmailLogDto): Promise<EmailLog> {
  //     return this.emailLogModel.findByIdAndUpdate(id, UpdateEmailLogDto,{new:true});
  // }
}

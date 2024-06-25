import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailLog, EmailLogDocument } from '../schemas/email-log.schema';
import { CreateEmailLogDto } from '../dto/email-log.dto';
import { UpdateEmailLogDto } from '../dto/email-log.dto';

@Injectable()
export class EmailLogService {
  constructor(
    @InjectModel(EmailLog.name) private emailLogModel: Model<EmailLogDocument>,
  ) {}

  async create(
    createEmailLogDto: CreateEmailLogDto,
  ): Promise<EmailLogDocument> {
    const createEmailLog = new this.emailLogModel(createEmailLogDto);
    return createEmailLog.save();
  }

  async findAll(): Promise<EmailLogDocument[]> {
    return this.emailLogModel.find().exec();
  }

  async update(
    id: string,
    updateEmailLogDto: UpdateEmailLogDto,
  ): Promise<EmailLogDocument> {
    return this.emailLogModel.findByIdAndUpdate(id, updateEmailLogDto, {
      new: true,
    });
  }

  async findById(id: string): Promise<EmailLogDocument> {
    return this.emailLogModel.findById(id).exec();
  }
}

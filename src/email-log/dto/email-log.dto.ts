import { IsString, IsDate, IsEnum, IsOptional } from 'class-validator';
import { EmailLogStatus } from '../email-log-status.enum';

export class CreateEmailLogDto {
  @IsEnum(EmailLogStatus)
  status: EmailLogStatus;

  @IsString()
  kindSubject: string;

  @IsString()
  businessId: string;

  @IsString()
  recipient: string;

  @IsDate()
  timestamp: Date;
}

export class UpdateEmailLogDto {
  @IsEnum(EmailLogStatus)
  status: EmailLogStatus;

  @IsString()
  @IsOptional()
  errorMessage?: string;
}

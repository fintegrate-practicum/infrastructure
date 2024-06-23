import { IsString, IsDate } from 'class-validator';

export class CreateEmailLogDto {
  @IsString()
  status: string;

  @IsString()
  kindSubject: string;

  @IsString()
  businessId: string;

  @IsString()
  recipient: string;

  @IsDate()
  timestamp: Date;

  @IsString()
  errorMessage?: string;
}

export class UpdateEmailLogDto {
  @IsString()
  status: string;

  @IsString()
  errorMessage?: string;
}

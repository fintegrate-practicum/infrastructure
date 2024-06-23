import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
    const dbUri = this.configService.get<string>('DATABASE_URI');
    console.log(`DB URI from ConfigService: ${dbUri}`);
  }
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }
}

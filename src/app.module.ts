import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitConsumerService } from './services/rabbit-consumer/rabbit-consumer.service';
import { EmailService } from './services/email.service';
import { MessageService } from './services/message.service';
import { MailBridgeService } from './services/mail-bridge/mail-bridge.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailLogModule } from './email-log/module/email-log.module';
import { EmailModule } from './modules/email.module';
import { EmailSettingsModule } from './email-settings/modules/email-settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailModule,
    EmailLogModule,
    EmailSettingsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: process.env.MONGODB_URI,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RabbitConsumerService,
    EmailService,
    MessageService,
    MailBridgeService,
  ],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    try {
      // הודעה כאשר התחברות למסד הנתונים מוצלחת
      console.log('Connected to MongoDB successfully!');
    } catch (error) {
      // הודעת שגיאה אם יש בעיה בהתחברות למסד הנתונים
      console.error('Failed to connect to MongoDB:', error);
    }
  }
}

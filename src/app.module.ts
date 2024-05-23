import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitConsumerService } from './services/rabbit-consumer/rabbit-consumer.service';
import { EmailModule } from './modules/email.module';
import { EmailService } from './services/email.service';
import { ConfigModule } from '@nestjs/config';
import { MessageService } from './services/message.service';
import { MailBridgeService } from './services/mail-bridge/mail-bridge.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailModule,
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
export class AppModule {}

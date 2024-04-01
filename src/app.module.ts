import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitConsumerService } from './services/rabbit-consumer/rabbit-consumer.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RabbitConsumerService],
})
export class AppModule {}

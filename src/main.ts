import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import { RabbitConsumerService } from './services/rabbit-consumer/rabbit-consumer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  log("server is runing");

  const rabbitConsumerService = app.get(RabbitConsumerService);
  rabbitConsumerService.consumeMessages();

}
bootstrap();




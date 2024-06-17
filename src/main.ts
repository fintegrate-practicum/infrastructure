import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.URL],
        queue: process.env.RABBITMQ_QUEUE_NAME,
        exchange:process.env.RABBITMQ_EXCHANGE_NAME,
        username: process.env.AMQP_USERNAME,
        password: process.env.AMQP_PASSWORD,
      },
    });
    await app.listen();
    console.log('Microservice is listening');
  } catch (error) {
    console.error('Error connection:', error);
  }
}

bootstrap();

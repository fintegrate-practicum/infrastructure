import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Transport, MicroserviceOptions} from '@nestjs/microservices';
import { AppController } from './app.controller';

  async function bootstrap() {
    const app = await NestFactory.createMicroservice(
      AppModule, 
      {
      transport: Transport.RMQ,
      options: {  
        urls: ['amqp://localhost:5673'],
        queue: 'message_queue',
        queueOptions: {
          durable: false
        },
        username: 'guest',
        password: 'guest',
      },
    });
    await app.listen();
  }
  bootstrap();


  
  
    
  
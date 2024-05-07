import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitConsumerService } from './services/rabbit-consumer/rabbit-consumer.service';

//יצירת החיבור עם רביט
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBIT_CONSUMER_SERVICE',
        transport: Transport.RMQ, 
        options: {  
          urls: ['amqp://localhost:5673'],
          queue: 'message_queue',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [RabbitConsumerService,AppService],
})
export class AppModule {}





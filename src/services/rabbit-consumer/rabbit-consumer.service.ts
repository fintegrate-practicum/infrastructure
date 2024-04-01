import { Injectable } from '@nestjs/common';
import amqp from 'amqplib';
import { ClientProxyFactory, Transport,ClientProxy } from '@nestjs/microservices';



@Injectable()
export class RabbitConsumerService {
    private readonly client: ClientProxy;
  
    constructor() {
      this.client = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'tryConsumer', 
        },
      });
    }
  

  async consumeMessages(): Promise<void> {
    try{
      await this.client.connect(); 
      console.log('Waiting for messages...');
      this.client.send('tryConsumer',{}).subscribe((message) => {
            console.log('Received', message.content.toString());
          },
        (error)=>{
            console.error('Error:',error)
        });
    } catch(error){
      console.error('Error connecting to RabbitMQ:', error);
    }
  }
}

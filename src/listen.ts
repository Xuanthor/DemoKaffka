import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport ,MicroserviceOptions} from '@nestjs/microservices';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
async function bootstrap() {
const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
    },
    consumer:{
      groupId: 'product-consumer'
    }
  }
})
 app.listen();console.log('Microservice is listening');
};
bootstrap();

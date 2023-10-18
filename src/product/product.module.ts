import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Transport,ClientsModule } from '@nestjs/microservices';
@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'product',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'product-consumer'
        }
      }
    },
  ]),],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}

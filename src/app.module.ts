import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ShopDoAn:JMwj5LA3CanlYyqg@cluster0.mfdjtkj.mongodb.net/nest_app2'), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

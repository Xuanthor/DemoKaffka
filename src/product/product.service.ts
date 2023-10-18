import {  Injectable,Inject } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientKafka,ClientGrpcProxy} from '@nestjs/microservices';
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)private productsRepository: Repository<Product>,
   
      ) {}


     async create(data) : Promise<Product | null>{
         return await this.productsRepository.save(data)
      }
      findAll(): Promise<Product[]> {
        return this.productsRepository.find();
      }
      async findOne(id: number): Promise<Product | null> {
        return await this.productsRepository.findOneBy({ id });
      }
    async  update (id:number,data:any): Promise<any>
      {
          return await this.productsRepository.update(id,data)
      }
      async remove(id: number): Promise<void> {
        await this.productsRepository.delete(id);
      }
}

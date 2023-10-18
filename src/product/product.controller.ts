import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices/decorators';

@Controller('product')
export class ProductController {
    constructor(private readonly productsService: ProductService) {}
    
    @EventPattern('hello')
    async hello(data :any){
             return data
    }
    @EventPattern('productCreate')
    async create(data:any){
        console.log(data)
      return await  this.productsService.create(data)
    }
    @EventPattern('productFindOne')
    async findOne(data:any){
        console.log(data)
      return await  this.productsService.findOne(data)
    }

    @EventPattern('productUpdate')
    async update(data:any){
        console.log(data)
    return  await  this.productsService.update(data)
    }
    @EventPattern('productRemove')
    async remove(data:any){
        console.log(data)
      await  this.productsService.remove(data)
    }



}

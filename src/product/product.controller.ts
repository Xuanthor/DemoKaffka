import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ClientKafka,ClientGrpcProxy} from '@nestjs/microservices';

@Controller('product')
export class ProductController {
    constructor(
      private productService : ProductService,
      @Inject('PRODUCT_SERVICE') private readonly client:ClientKafka
      )
    {}
    @Post()
 async create(
        @Body("name") Name : string,
        @Body("address") Address : string,
        @Body("age") Age : number) {
    const product = await this.productService.create({Name,Address,Age});
    this.client.emit('productCreate',product)
    return product
  }
  @Get()
async  findAll() {
    const product= await this.productService.findAll();
    this.client.emit('hello',product);
    return product
  }
  @Get(':id')
 async findOne(@Param('id') id: string) {
    const data= await this.productService.findOne(+id);
    const product = {id : data.id}
    this.client.emit('productFindOne',product)
    return data
  }
  @Patch(':id')
 async update(@Param('id') id: string, @Body("name") Name : string,
  @Body("address") Address : string,
  @Body("age") Age : number) {
   await this.productService.update(+id, {Name,Address,Age});
  const data =await this.productService.findOne(+id)
    const product = {id : data.id,Name:data.Name,Age:data.Age,Address:data.Address}
    this.client.emit('productUpdate',product)
    return product
  }
  @Delete(':id')
async  remove(@Param('id') id: string) {
     await this.productService.remove(+id);
     const product = {id : id}
    this.client.emit('productRemove',product);
  }
   
}

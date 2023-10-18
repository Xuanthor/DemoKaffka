import { Injectable } from '@nestjs/common';
import { Product } from './schema.product';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(data:any): Promise<Product> {
    const result= await this.productModel.create({
      id:data.id,
      name:data.Name,
      address:data.Address,
      age:data.Age
    })
    return result
  }

  findAll(): Promise<Product[]> {

    return this.productModel.find();
  }
  async findOne(data:any): Promise<Product | null> {
    const result = await this.productModel.findOne({id:data.id});
    console.log(result)
    return result
  }
async  update (data:any): Promise<any>
  {
      return await this.productModel.updateOne({id:data.id},{name:data.Name,age:data.Age,address:data.Address})
  }
  async remove(data: any): Promise<void> {
    const result= await this.productModel.deleteOne({id:data.id});
    console.log(result)
  }
}

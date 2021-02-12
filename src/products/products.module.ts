import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import {MongooseModule} from "@nestjs/mongoose";
import {Product, ProductSchema} from "./models/product.model";

@Module({
  imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}])],
  providers: [ProductsService, ProductsResolver]
})
export class ProductsModule {}

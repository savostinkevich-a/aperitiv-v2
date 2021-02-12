import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ProductsService} from "./products.service";
import {PaginatedProducts} from "./models/paginated-products.model";
import {FilterProductsInput} from "./dto/filter-products.input";
import {PaginationArgs} from "./dto/pagination.args";
import {Product} from "./models/product.model";
import {CreateProductInput} from "./dto/create-product.input";
import {UpdateProductInput} from "./dto/update-product.input";
import {Types} from "mongoose";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../auth/guards/gql-auth-guard";


@Resolver()
export class ProductsResolver {
    constructor(private productsService: ProductsService) {
    }

    @Query(() => PaginatedProducts)
    async getProducts(
        @Args(`filters`, {nullable: true}) filters: FilterProductsInput,
        @Args() args: PaginationArgs
    ): Promise<PaginatedProducts> {
        return this.productsService.getProducts(filters, args)
    }

    @Query(() => Product)
    async getProductById(
        @Args(`_id`, {type: () => String}) _id: Types.ObjectId
    ): Promise<Product> {
        return this.productsService.getProductById(_id)
    }

    @Query(() => Product)
    async getProductByPrettyId(
        @Args(`prettyId`, {type: () => String}) prettyId: string
    ): Promise<Product> {
        return this.productsService.getProductByPrettyId(prettyId)
    }

    @Mutation(() => Product)
    @UseGuards(GqlAuthGuard)
    async createProduct(
        @Args(`createProductData`) createProductData: CreateProductInput
    ): Promise<Product> {
        return this.productsService.createProduct(createProductData)
    }

    @Mutation(() => Product)
    @UseGuards(GqlAuthGuard)
    async updateProduct(
        @Args(`updateProductData`) updateProductData: UpdateProductInput
    ): Promise<Product> {
        return this.productsService.updateProduct(updateProductData)
    }

    @Mutation(() => Product)
    @UseGuards(GqlAuthGuard)
    async deleteProduct(
        @Args(`_id`, {type: () => String}) _id: Types.ObjectId
    ) {
        return this.productsService.deleteProduct(_id)
    }
}

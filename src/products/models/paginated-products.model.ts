import {Field, ObjectType} from "@nestjs/graphql";
import {Product} from "./product.model";

@ObjectType()
export class PaginatedProducts {
    @Field(() => [Product])
    products: Product[]

    @Field()
    total: number
}
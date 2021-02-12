import {Field, InputType} from "@nestjs/graphql";
import {Categories} from "../enums/categories.enum";

@InputType()
export class FilterProductsInput {
    @Field(() => Categories, {nullable: true})
    category?: Categories
}

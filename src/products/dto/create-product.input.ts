import {Field, InputType} from "@nestjs/graphql";
import {Categories} from "../enums/categories.enum";

@InputType()
export class CreateProductInput {
    @Field(() => String)
    title: string

    @Field(() => String, {nullable: true})
    description?: string

    @Field(() => Number)
    price: number

    @Field(() => Categories, {nullable: true})
    category?: Categories

    @Field(() => [String])
    imageUrls: Array<string>
}

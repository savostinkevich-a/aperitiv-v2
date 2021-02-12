import {Field, InputType} from "@nestjs/graphql";
import {Categories} from "../enums/categories.enum";
import {Types} from "mongoose";

@InputType()
export class UpdateProductInput {
    @Field(() => String)
    _id: Types.ObjectId

    @Field(() => String, {nullable: true})
    title?: string

    @Field(() => Categories, {nullable: true})
    category?: Categories
}

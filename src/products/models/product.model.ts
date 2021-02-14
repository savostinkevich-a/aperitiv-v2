import {Field, ObjectType} from "@nestjs/graphql";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document,Types} from "mongoose";
import {Categories} from "../enums/categories.enum";

@ObjectType()
@Schema()
export class Product {
    @Field(() => String)
    _id: Types.ObjectId

    @Field(() => String )
    @Prop({unique: true})
    prettyId : string

    @Field(() => String)
    @Prop()
    title: string

    @Field(() => String, {nullable: true})
    @Prop()
    description?: string

    @Field(() => Number)
    @Prop()
    price: number

    @Field(() => Categories, {nullable: true})
    @Prop({type: Categories})
    category?: Categories

    @Field(() => [String])
    @Prop()
    imageUrls: Array<string>
}

export type ProductDocument = Product & Document

export const ProductSchema = SchemaFactory.createForClass(Product)
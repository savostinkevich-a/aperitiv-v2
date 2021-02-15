import {Field, InputType} from "@nestjs/graphql";
import {Types} from "mongoose";

@InputType()
export class CreateConnectInput {
    @Field(() => String, {nullable: true})
    productId?: Types.ObjectId

    @Field()
    name: string

    @Field()
    desiresText: string

    @Field(() => [String], {nullable: true})
    desires?: Array<string>

    @Field()
    phone: string
}
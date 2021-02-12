import {Field, InputType} from "@nestjs/graphql";
import {Types} from "mongoose";

@InputType()
export class UpdateConnectInput {
    @Field(() => String)
    _id: Types.ObjectId

    @Field(() => Boolean, {nullable: true})
    isViewed?: boolean

    @Field(() => Boolean, {nullable: true})
    isConnected?: boolean

    @Field(() => Boolean, {nullable: true})
    isSold?: boolean
}
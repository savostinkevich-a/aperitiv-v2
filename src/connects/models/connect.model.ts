import {Field, ObjectType} from "@nestjs/graphql";
import {Types, Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Steps} from "../emuns/steps.enum";


@ObjectType()
@Schema()
export class Connect {
    @Field(() => String)
    _id: Types.ObjectId

    @Field(() => String, {nullable: true})
    @Prop()
    productId?: Types.ObjectId

    @Field(() => String)
    @Prop()
    name: string

    @Field(() => String)
    @Prop()
    desiresText: string

    @Field(() => [String])
    @Prop()
    desires: Array<string>

    @Field(() => String)
    @Prop()
    phone: string

    @Field(() => Date)
    @Prop()
    date: Date

    @Field(() => Steps)
    @Prop({type: Steps})
    step: Steps
}

export type ConnectDocument = Connect & Document

export const ConnectSchema = SchemaFactory.createForClass(Connect)
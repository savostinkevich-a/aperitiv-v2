import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: Types.ObjectId

  @Field()
  @Prop()
  login: string

  @Field()
  @Prop()
  password: string


}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
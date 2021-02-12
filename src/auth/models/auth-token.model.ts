import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class AuthToken {
  @Field()
  user: User

  @Field()
  token: string
}
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegistrationInput {
  @Field()
  login: string

  @Field()
  password: string
}
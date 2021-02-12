import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthToken } from './models/auth-token.model';
import { LoginInput } from './dto/login.input';
import { RegistrationInput } from './dto/registration.input';
import { User } from './models/user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth-guard';
import {Response} from "express";
import {ResGql} from "./decorators/response.decorator";
import {ResponseCode} from "./models/response-code.model";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {
  }

  @Query(() => ResponseCode)
  @UseGuards(GqlAuthGuard)
  async auth(): Promise<ResponseCode> {
    return {responseCode: 1}
  }

  @Mutation(() => AuthToken)
  async login(
    @Args(`loginData`) loginData: LoginInput,
    @ResGql() res: Response
  ): Promise<AuthToken> {
    return this.authService.login(res, loginData)
  }

  @Mutation(() => Boolean)
  async logout(
      @ResGql() res: Response
  ): Promise<Boolean> {
    return this.authService.logout(res)
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async registration(
    @Args(`registrationData`) registrationData: RegistrationInput
  ): Promise<User> {
    return this.authService.registration(registrationData)
  }

  @Query(() => String)
  async sayHello(): Promise<string> {
    return this.authService.sayHello()
  }
}

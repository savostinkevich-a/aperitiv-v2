import {Injectable, Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model, Types } from 'mongoose';
import { LoginInput } from './dto/login.input';
import { RegistrationInput } from './dto/registration.input';
import { AuthToken } from './models/auth-token.model';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from './dto/jwt.dto';
import {Response} from "express";
import {ResponseCode} from "./models/response-code.model";

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
              private jwtService: JwtService) {
  }

  public sayHello(): string {
    return 'Hello'
  }

  public getUserById(_id: Types.ObjectId): Promise<User> {
    return this.userModel.findById(_id).exec();
  }


  public async login(res: Response, loginData: LoginInput): Promise<AuthToken> {
    const user = await this.userModel.findOne({ login: loginData.login }).exec();

    let isMatch: boolean;
    if (user) {
      isMatch = await bcrypt.compare(loginData.password, user.password);
    } else {
      isMatch = false;
    }

    if (user && isMatch) {

      res.cookie('token', this.signToken(user._id))
      console.log(res)
      return { user, token: this.signToken(user._id) };
    }
    throw new Error('Неправильные данные');
  }

  public async logout(res: Response): Promise<Boolean> {
    res.cookie('token', '')
    return true
  }

  public async registration(registrationData: RegistrationInput): Promise<User> {
    const found = await this.userModel.findOne({ login: registrationData.login }).exec();
    if (!found) {
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);
      const user = await new this.userModel({ ...registrationData, password: hashedPassword });
      user.save();
      return user
    }
    throw new Error(`Пользователь с логином ${registrationData.login} уже есть!`);
  }

  async validateUser(_id: Types.ObjectId) {
    return this.userModel.findById(_id);
  }

  private signToken(_id: Types.ObjectId) {
    const payload: JwtDto = { _id };
    return this.jwtService.sign(payload);
  }
}

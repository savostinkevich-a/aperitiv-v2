// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthService } from '../auth.service';
// import { JwtDto } from '../dto/jwt.dto';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
//
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super({
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         secretOrKey: 'SECRET',
//       },
//     );
//   }
//
//   async validate(payload: JwtDto) {
//     const user = await this.authService.validateUser(payload._id);
//     if(!user) {
//       throw new UnauthorizedException()
//     }
//     return user
//   }
// }

import {Injectable, Logger} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';

const cookieExtractor = (req: Request): string | null => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: 'SECRET',
    });
  }

  validate(payload) {
    return this.authService.validateUser(payload);
  }
}
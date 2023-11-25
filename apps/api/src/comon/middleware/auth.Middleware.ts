import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/collateral/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req?.headers.authorization) {
      throw new HttpException('authentication is required', 403);
    } else {
      let verify;
      try {
        const token = req.headers.authorization?.split(' ')[1];
        verify = await this.jwtService.verifyAsync(token, {
          secret: 'anihadin',
        });
      } catch (error) {
        // console.log(error,"error")
      }

      if (verify) {
        const checkRole = await this.authService.checkRole(verify.email);
        if (checkRole[0]?.role[0]?.name === 'admin') {
          next();
        } else {
          throw new HttpException('only admin allows to create user', 403);
        }
      } else {
        throw new HttpException('authentication is required', 403);
      }
    }
  }
}

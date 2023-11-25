import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SCOPES_KEY } from './scopes.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const scopes = this.reflector.getAllAndOverride(SCOPES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      const { headers } = context.switchToHttp().getRequest();
      if (headers['authorization']) {
        const authorization = headers['authorization'].split('Bearer ')[1];
        const token = await this.jwtService.verify(authorization);
        const requestScopes = token.scope.split(' ');
        for (const scope of scopes) {
          if (!requestScopes.includes(scope)) return false;
        }
        return true;
      }
    } catch {}
    return false;
  }
}

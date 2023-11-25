import { Inject, Injectable } from '@nestjs/common';
import { UserDocument } from '../users/users.schema';
import { KeyLike, SignJWT } from 'jose';
import { ConfigService } from '@nestjs/config';

export interface TokenPair {
  id_token: string;
  access_token: string;
}

@Injectable()
export class JwtService {
  constructor(
    @Inject('PRIVATE_KEY') private readonly private_key: KeyLike,
    private readonly configService: ConfigService,
  ) {}

  /**
   * createTokenPair
   * @param {UserDocument} user
   * @param {string} audience
   * @param scope
   */
  public async createTokenPair(
    user: UserDocument,
    audience: string,
    scope: string,
  ): Promise<TokenPair> {
    const userId = user._id.toString();

    const id_token = await new SignJWT({
      name: user.username,
    })
      .setProtectedHeader({
        alg: 'RS256',
      })
      .setIssuedAt()
      .setIssuer(this.configService.get('HOST'))
      .setSubject(userId)
      .setAudience(audience)
      .setExpirationTime(this.configService.get('ID_TOKEN_EXPIRATION'))
      .sign(this.private_key);

    const access_token = await new SignJWT({
      scope,
    })
      .setProtectedHeader({
        alg: 'RS256',
      })
      .setIssuedAt()
      .setIssuer(this.configService.get('HOST'))
      .setSubject(userId)
      .setAudience(audience)
      .setExpirationTime(this.configService.get('AUTH_TOKEN_EXPIRATION'))
      .sign(this.private_key);

    return {
      id_token,
      access_token,
    };
  }
}

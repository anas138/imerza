import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RedisClientType } from 'redis';
import ms from 'ms';

interface Login {
  clientId: string;
  userId: string;
  codeChallenge: string;
}

interface RefreshToken {
  clientId: string;
  userId: string;
}

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  public async createLogin(
    clientId: string,
    code: string,
    userId: string,
    codeChallenge: string,
  ) {
    const key = `code:${code}`;
    await this.redisClient
      .multi()
      .set(
        key,
        JSON.stringify({
          clientId,
          userId,
          codeChallenge,
        }),
      )
      .expire(key, 60 * 15 /* 15 minutes */)
      .exec();
  }

  /**
   * Finds the user id for the specified auth code
   * @param code
   * @return {string} User ID
   */
  public async findLogin(code: string): Promise<Login> {
    const login = await this.redisClient.getDel(`code:${code}`);
    if (!login) {
      throw new NotFoundException();
    }

    return JSON.parse(login);
  }

  public async createRefreshToken(
    clientId: string,
    refreshToken: string,
    userId: string,
  ) {
    const key = `refreshToken:${refreshToken}`;
    await this.redisClient
      .multi()
      .set(
        key,
        JSON.stringify({
          clientId,
          userId,
        }),
      )
      .expire(key, ms(process.env.REFRESH_TOKEN_EXPIRATION) / 1000)
      .exec();
  }

  public async findRefreshToken(refreshToken: string): Promise<RefreshToken> {
    const refreshTokenEntry = await this.redisClient.getDel(
      `refreshToken:${refreshToken}`,
    );
    if (!refreshTokenEntry) {
      Logger.error(`Refresh Token ${refreshToken} not found`);
      throw new NotFoundException();
    }

    return JSON.parse(refreshTokenEntry);
  }
}

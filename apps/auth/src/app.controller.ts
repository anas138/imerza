import {
  Body,
  Controller,
  Get,
  Put,
  HttpCode,
  Logger,
  NotFoundException,
  Post,
  Query,
  Render,
  UnauthorizedException,
  UnprocessableEntityException,
  Param,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JoiValidationPipe } from './common/validation.pipe';
import { userValidationSchema } from './common/joi-validation-schema';
import public_key from '../keys/pub.json';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { CryptoService } from './crypto/crypto.service';
import { RedisService } from './redis/redis.service';
import { JwtService } from './jwt/jwt.service';
import { JwtService as jwtS } from '@nestjs/jwt';
import { MessagePattern } from '@nestjs/microservices';

export enum GrantType {
  AuthorizationCode = 'authorization_code',
  RefreshToken = 'refresh_token',
}

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly cryptoService: CryptoService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private jwtS: jwtS,
  ) {}

  @Get('/authorize')
  @Render('index')
  getLogin() {
    return {};
  }

  @Post('/authorize')
  async postLogin(
    // @Query('redirect_uri') redirectUri,
    // @Query('code_challenge') codeChallenge,
    // @Query('state') state,
    // @Query('client_id') clientId,
    @Body() body,
  ) {
    const user = await this.usersService.find(body.username, body.password);

    if (!user) {
      return {
        error: 'password is incorrect',
      };
    }

    // const url = new URL(redirectUri);

    // const code = this.cryptoService.generateCode();
    // await this.redisService.createLogin(
    //   clientId,
    //   code,
    //   user._id.toString(),
    //   codeChallenge,
    // );

    // url.searchParams.set('code', code);
    // url.searchParams.set('state', state);
    const rUser = {
      name: user.username,
      email: user.email,
    };
    const token = this.jwtS.sign(rUser);
    return {
      id: user._id,
      name: user.username,
      email: user.email,
      accesssToken: token,
      //redirect_uri: url.toString(),
    };
  }

  @Post('/token')
  @HttpCode(200)
  async token(
    @Body() body,
    @Body('grant_type') grantType: GrantType,
    @Body('code') code: string,
    @Body('code_verifier') codeVerifier: string,
    @Body('refresh_token') refreshToken: string = null,
  ) {
    if (grantType == GrantType.RefreshToken) {
      const refreshTokenEntry = await this.redisService.findRefreshToken(
        refreshToken,
      );

      const user = await this.usersService.findById(refreshTokenEntry.userId);

      if (!user) {
        // In the rare case that a user is deleted while logging in, 404
        Logger.error(`User ${refreshTokenEntry.userId} not found`);
        throw new NotFoundException();
      }

      const newRefreshToken = this.cryptoService.generateRefreshToken();

      await this.redisService.createRefreshToken(
        refreshTokenEntry.clientId,
        newRefreshToken,
        refreshTokenEntry.userId,
      );

      const scope = await this.usersService.findScopesForWorkspace(user._id);

      const { id_token, access_token } = await this.jwtService.createTokenPair(
        user,
        refreshTokenEntry.clientId,
        scope,
      );

      return {
        id_token,
        access_token,
        token_type: 'Bearer',
        refresh_token: newRefreshToken,
        expires_in: ms(this.configService.get('AUTH_TOKEN_EXPIRATION')) / 1000,
      };
    } else if (grantType == GrantType.AuthorizationCode) {
      const { userId, codeChallenge, clientId } =
        await this.redisService.findLogin(code);

      const user = await this.usersService.findById(userId);

      if (!user) {
        // In the rare case that a user is deleted while logging in, 404
        Logger.error(`User ${userId} not found`);
        throw new NotFoundException();
      }
      if (
        codeChallenge &&
        !this.cryptoService.verifyCodeChallenge(codeVerifier, codeChallenge)
      ) {
        // if they don't match, there is a good chance someone is trying to forge a login
        throw new UnauthorizedException();
      }

      const refreshToken = this.cryptoService.generateRefreshToken();

      await this.redisService.createRefreshToken(
        clientId,
        refreshToken,
        userId,
      );

      const scope = await this.usersService.findScopesForWorkspace(user._id);

      const { id_token, access_token } = await this.jwtService.createTokenPair(
        user,
        clientId,
        scope,
      );

      return {
        id_token,
        access_token,
        token_type: 'Bearer',
        refresh_token: refreshToken,
        expires_in: ms(this.configService.get('AUTH_TOKEN_EXPIRATION')) / 1000,
      };
    }
    throw new UnprocessableEntityException();
  }

  @Get('/jwk')
  jwks() {
    return {
      keys: [public_key],
    };
  }

  @Get('/success')
  success() {
    return {
      isCool: true,
    };
  }
  @Get('/users')
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    if (users) {
      return users;
    }
    return null;
  }
  @Put('/updatePermission/:name/:permission')
  async updatePermission(
    @Param('name') name: string,
    @Param('permission') permission: string,
  ) {
    const update = await this.usersService.updatePermission(name, permission);
    if (update) {
      return update;
    }
    return null;
  }
  @Post('adduser')
  async addUser(@Body( new JoiValidationPipe(userValidationSchema)) body){
    const uerReq = await this.usersService.addUser(body)
    if(uerReq){
      return uerReq
    }else{
      return null
    } 
  }
  @MessagePattern('users')
  async checkusersMicroservice(data){
    const users = await this.usersService.getAllUsers();
    if (users) {
      return users;
    }
    return null;
  }
}

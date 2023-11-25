import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { OpenidModule } from './openid/openid.module';
import { importJWK } from 'jose';
import private_key from '../keys/private.json';
import { ConfigModule } from '@nestjs/config';
import { CryptoService } from './crypto/crypto.service';
import { RedisModule } from './redis/redis.module';
import { JwtService } from './jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017'),
    UsersModule,
    OpenidModule,
    RedisModule,
    JwtModule.register({
      secret: "imerza",
      signOptions: { expiresIn: '600000s' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'PRIVATE_KEY',
      useFactory: async () => {
        return importJWK(private_key, 'RS256');
      },
    },
    CryptoService,
    JwtService,  ],
})
export class AppModule {}

import { MiddlewareConsumer, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Auth,AuthSchema } from "./schema/auth.schema";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthMiddleware } from "src/comon/middleware/auth.Middleware";
import { RolesModule } from "../roles/roles.module";
@Module({
    imports:[ MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule.register({
        secret: "anihadin",
        signOptions: { expiresIn: '60h' },
      }),
      RolesModule
    ],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(AuthMiddleware)
    //   .forRoutes('auth/singnup')
    //   consumer
    //   .apply(AuthMiddleware)
    //   .forRoutes('auth/users')
  }
}
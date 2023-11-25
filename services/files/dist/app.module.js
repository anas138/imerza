"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const s3_service_1 = require("./s3/s3.service");
const files_schema_1 = require("./schemas/files.schema");
const microservices_1 = require("@nestjs/microservices");
const redis_module_1 = require("./redis/redis.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            redis_module_1.RedisModule,
            microservices_1.ClientsModule.register([
                {
                    name: 'PROJECTS_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: { port: 4005 },
                },
            ]),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URL),
            mongoose_1.MongooseModule.forFeature([{ name: files_schema_1.Files.name, schema: files_schema_1.FilesSchema }]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, s3_service_1.S3Service],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
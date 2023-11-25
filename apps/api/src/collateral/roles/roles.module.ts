import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Roles,RolesSchema } from "./schema/roles.schema";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";

@Module({
    
    imports:[ MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }])],
    controllers:[RolesController],
    providers:[RolesService],
    exports:[RolesService]
})
export class RolesModule{}
import { Module } from "@nestjs/common";
import { ImageCopiesController } from "./image.copies.controller";
import { ImageCopiesService } from "./image.copies.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageCopies,ImageCopiesSchema } from "./schema/image.copies.schema";
@Module({
   imports:[
    MongooseModule.forFeature([{ name: ImageCopies.name, schema: ImageCopiesSchema }]),
   ],
   controllers:[ImageCopiesController],
   providers:[ImageCopiesService],
   exports:[ImageCopiesService] 
})
export class ImageCopiesModule{

}
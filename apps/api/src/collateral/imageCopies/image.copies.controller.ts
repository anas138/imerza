import { Controller } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ImageCopies,ImageCopiesDocument } from "./schema/image.copies.schema";
import { Model } from "mongoose";

@Controller()
export class ImageCopiesController{
  constructor(
    @InjectModel(ImageCopies.name) private imageCopies: Model<ImageCopiesDocument>,
  ){}

}
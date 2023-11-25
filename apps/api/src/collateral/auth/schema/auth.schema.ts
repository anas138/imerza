import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Roles } from 'src/collateral/roles/schema/roles.schema';

export type AuthDocument = Auth & Document;
@Schema({ timestamps: true })
export class Auth {
  @Prop()
  name: string;
  @Prop({default:""})
  password: string;
  @Prop()
  email:string;
  @Prop({default:null})
  projectId:string;
  @Prop({default:false})
  verify:boolean
  @Prop()
  role:string
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

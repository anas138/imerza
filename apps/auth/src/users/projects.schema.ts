import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Project as ImerzaProject, ProjectUser } from '@imerza/types';

export type ProjectDocument = Project & Document;

@Schema()
export class Project implements ImerzaProject {
  @Prop()
  logo: string;

  @Prop()
  name: string;

  @Prop()
  project_root: string;
  
  @Prop()
  screenshots: string;

  @Prop({ type: Object })
  settings: { [p: string]: unknown };

  @Prop()
  users: ProjectUser[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

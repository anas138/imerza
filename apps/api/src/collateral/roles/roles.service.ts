import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Roles, RolesDocument } from './schema/roles.schema';
import { Model } from 'mongoose';
import { RoleDto } from './dto/roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles.name) private roleModel: Model<RolesDocument>,
  ) {}
  async addRole(body: RoleDto) {
    const data = {
      name: body.name.toLowerCase(),
    };
    const schema = new this.roleModel(data);
    const role = await schema.save();
    if (role) {
      return role;
    } else {
      return null;
    }
  }
  async allRoles() {
    const roles = await this.roleModel.find();
    if (roles) {
      return roles;
    }
  }
  async findRole() {
    const role = await this.roleModel.findOne({ name: 'admin' });
    if (role) {
      return role;
    } else {
      return null;
    }
  }
  async checkRole(name: string) {
    const findRole = await this.roleModel.findOne({ name: name });
    if (findRole) {
      return findRole;
    } else {
      return null;
    }
  }
}

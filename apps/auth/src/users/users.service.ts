import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { Project, ProjectDocument } from './projects.schema';
import { verify } from 'argon2';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async findWorkspaces(id: Types.ObjectId) {
    return this.projectModel.find({
      'users._id': id,
    });
  }

  async findScopesForWorkspace(userId: Types.ObjectId): Promise<string> {
    const projects = await this.findWorkspaces(userId);
    if (!projects[0]) {
      throw new NotFoundException();
    }

    const { scopes } = projects[0].users.find(({ _id }) => {
      return _id.toString() == userId.toString();
    });

    return [`project:${projects[0]._id.toString()}`, ...scopes].join(' ');
  }

  async find(username: string, password: string) {
    const user = await this.usersModel.findOne({
      username,
    });
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    } else {
      throw new HttpException(
        { message: 'invalid password', error: true },
        404,
      );
    }
  }

  async findById(userId: string) {
    return this.usersModel.findById(userId);
  }
  async getAllUsers() {
    const users = await this.usersModel.find();
    if (users) {
      return users;
    }
    return null;
  }

  async updatePermission(name: string, permission: string) {
    console.log(name, permission);
    const res = await this.usersModel.updateOne(
      { username: name },
      { $set: { permission: permission } },
    );
    console.log(res, 'res');
    if (res) {
      return 'permission is updated';
    }
  }

  async addUser(body) {
    console.log(body, 'body');
    const saltOrRounds = 10;
    const password = body.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    if (hash) {
      const data = {
        username: body.username,
        password: hash,
        email: body.email,
        permission: body.permission,
      };
      await this.findUserByName(body.username);
      const model = await new this.usersModel(data);
      const newUser = await model.save();
      if (newUser) return newUser;
    }
  }

  async findUserByName(username) {
    const user = await this.usersModel.findOne({ username: username });
    console.log(user, 'checkUser');
    if (user) {
      throw new HttpException(
        { message: 'user already exists', error: true },
        404,
      );
    } else {
      return null;
    }
  }
}

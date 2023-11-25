import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../service/mailService/mailService';
import * as mysql from 'mysql';
import * as util from 'util';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private jwtService: JwtService,
    private roleService: RolesService,
  ) {}

  async findUser(email: string) {
    const user = await this.authModel.findOne({ email: email });
    if (user) {
      return user;
    } else {
      return null;
    }
  }
  async addUser(auth: AuthDto) {
    const model = new this.authModel(auth);
    const user = await model.save();
    if (user) {
      MailService(user.email);
      return 'user is added successfully';
    }
  }

  async loginUser(body: any) {
    const user = await this.authModel.findOne({ email: body.email });
    if (user) {
      const checkPassword = bcrypt.compareSync(body.password, user.password);
      if (checkPassword) {
        const payload = {
          id: user._id,
          email: user.email,
          projectId: user.projectId,
          role: user.role,
        };
        return {
          access_token: await this.jwtService.signAsync(payload),
          role: user.role,
          id: user._id,
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  async verifyEmail(email: string) {
    const verify = await this.authModel.findOne({ email: email });
    if (!verify) {
      return null;
    } else {
      const updateVerification = await this.authModel.updateOne(
        { email: email },
        { $set: { verify: true } },
      );
      if (updateVerification) return 'email verify successfully';
    }
  }
  async setPassword(email: string, password: string) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const checkVerified = await this.authModel.findOne({
      email: email,
      verify: true,
    });
    if (checkVerified) {
      const set = await this.authModel.updateOne(
        { email: email },
        { $set: { password: hash } },
      );
      if (set) {
        return 'password updated successfully';
      } else {
        return null;
      }
    }
  }

  async getProjects() {
    const con = mysql.createConnection({
      host: `${process.env.dbhost}`,
      user: `${process.env.dbuser}`,
      password: `${process.env.dbpass}`,
      database: `${process.env.dbdb}`,
    });
    const query = util.promisify(con.query).bind(con);
    await con.connect(function (err: any) {
      if (err) throw err;
    });

    const sqlQuery = 'SELECT * FROM project';
    const response = await query(sqlQuery);
    if (response) {
      return response;
    }
  }
  async checkRole(email: string) {
    const user = await this.authModel.aggregate([
      { $match: { email: email } },
      {
        $lookup: {
          from: 'roles',
          as: 'role',
          localField: 'role',
          foreignField: '_id',
        },
      },
    ]);
    if (user) {
      return user;
    }
  }
  async getAllUsers() {
    const users = await this.authModel.find();
    if (users) {
      return users;
    } else {
      return null;
    }
  }

  async superAdmin(body: any) {
    const role = await this.roleService.findRole();
    const checkUser = await this.authModel.findOne({ email: body.email });

    if (!checkUser) {
      const saltRounds = 10;
      const hash = await bcrypt.hash(body.password, saltRounds);
      const user = {
        name: body.name,
        email: body.email,
        password: hash,
        verify: true,
        role: 'Admin',
      };
      const schema = new this.authModel(user);
      const superAdmin = schema.save();
      if (superAdmin) {
        return superAdmin;
      }
    } else {
      return null;
    }
  }

  async redirectToProject(user) {
    const payload = {
      id: user._id,
      email: user.email,
      projectId: user.projectId,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      role: user.role,
      id: user._id,
    };
  }
}

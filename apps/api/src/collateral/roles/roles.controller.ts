import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/roles.dto';
@Controller('/roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}
  @Post('/addRole')
  async addRole(@Body() body: RoleDto) {
    const checkRole = await this.roleService.checkRole(body.name.toLowerCase());
    if (!checkRole) {
      const role = await this.roleService.addRole(body);
      if (role) {
        return role;
      }
    }else{
        throw new HttpException("role already exists",403)
    }
  }
  @Get()
  async getAllRoles() {
    const roles = await this.roleService.allRoles();
    if (roles.length) {
      return roles;
    }
  }
}

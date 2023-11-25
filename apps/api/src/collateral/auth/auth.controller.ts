import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from 'src/comon/validation.pipe';
import {
  signUpValidation,
  loginValidation,
  setPasswordValidation,
  superAdmin,
} from 'src/comon/joi-validation-schema';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/singnup')
  async signupUser(
    @Body(new JoiValidationPipe(signUpValidation)) auth: AuthDto,
  ) {
    const user = await this.authService.findUser(auth.email);
    if (!user) {
      const addUser = await this.authService.addUser(auth);
      if (addUser) {
        return addUser;
      }
    } else {
      throw new HttpException('user already exists', 403);
    }
  }
  @Post('/login')
  async loginUser(@Body(new JoiValidationPipe(loginValidation)) body: any) {
    const login = await this.authService.loginUser(body);
    if (login) {
      return login;
    } else {
      throw new HttpException('incorrect email and password', 500);
    }
  }

  @Post('/verify')
  async EmailVerification(@Body() body) {
    const checkEmail = await this.authService.verifyEmail(body.email);
    if (checkEmail) {
      return checkEmail;
    } else {
      throw new HttpException('Email is incorrect', 500);
    }
  }

  @Post('/setpassword')
  async setPassword(@Body(new JoiValidationPipe(setPasswordValidation)) body) {
    const setPassword = await this.authService.setPassword(
      body.email,
      body.password,
    );
    if (setPassword) {
      return setPassword;
    } else {
      throw new HttpException('email is invalid or not verified', 500);
    }
  }

  @Get('/getProjects')
  async getProjects() {
    const projects = await this.authService.getProjects();
    if (projects) {
      return projects;
    }
  }

  @Get('/users')
  async getAllUsers() {
    const users = await this.authService.getAllUsers();
    return users;
  }

  @Post('/superadmin')
  async superUser(@Body(new JoiValidationPipe(superAdmin)) body) {
    const superAdmin = await this.authService.superAdmin(body);
    if (superAdmin) {
      return superAdmin;
    } else {
      throw new HttpException('user already exists', 404);
    }
  }
  @Post("/redirect")
  async redirectToProjects( @Body() body){
    const redirect = await this.authService.redirectToProject(body)
    return redirect
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserLoginDto } from '../../validation';
@Controller('/')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/signup')
  async signup(@Body() userDto: UserCreateDto) {
    return this.userService.signup(userDto);
  }
  @Post('/login')
  async login(@Body() userDto: UserLoginDto) {
    return this.userService.login(userDto);
  }
}

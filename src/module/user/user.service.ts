import { Injectable } from '@nestjs/common';
import { HttpMessage } from 'src/constant/httpMessage.constant';
import { IloginUserResponse, IUserCreate } from 'src/interface/user';
import { UserRepository } from './user.repository';
import { UserCreateDto, UserLoginDto } from 'src/validation';
import { hash, genSalt, compare } from 'bcrypt';
import { AuthenticationService } from 'src/helper/jwt.service';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly authenticationService: AuthenticationService,
  ) {}
  async signup(userDto: UserCreateDto): Promise<IUserCreate> {
    try {
      const checkUser = await this.userRepo.checkUserByEmail({
        email: userDto.email,
      });
      if (checkUser) {
        throw new Error(HttpMessage.USER_ALREADY_EXIST);
      }
      const salt = await genSalt(10);
      const hash_password = await hash(userDto.password, salt);
      userDto.password = hash_password;
      const userData = await this.userRepo.saveUserDetails(userDto);
      return { message: HttpMessage.SIGNUP_SUCCESSFULLY, data: userData };
    } catch (err) {
      return { statusCode: 500, message: err.message };
    }
  }
  async login(userLoginDto: UserLoginDto): Promise<IloginUserResponse> {
    try {
      const userData = await this.userRepo.checkUserByEmail({
        email: userLoginDto.email,
      });
      if (!userData) {
        return { message: HttpMessage.SIGNUP_PLEASE };
      }
      const password = await compare(userLoginDto.password, userData.password);
      if (!password) {
        return { message: HttpMessage.INVALID_CREDENTIAL };
      }
      const token = await this.authenticationService.generateToken({
        id: userData.id,
      });
      return {
        message: HttpMessage.LOGIN_SUCCESSFULLY,
        data: { token: String(token) },
      };
    } catch (err) {
      return { statusCode: 500, message: err.message };
    }
  }
}

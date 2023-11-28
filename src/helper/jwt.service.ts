import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Ipayload } from 'src/interface/user';
@Injectable()
export class AuthenticationService {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload: Ipayload) {
    try {
      const token = await this.jwtService.sign(payload);
      return token;
    } catch (e) {
      return {
        statusCode: 500,
        message: e.message,
      };
    }
  }
  async tokenVerify(data: string) {
    try {
      const payload = await this.jwtService.verify(data, { secret: 'iamuser' });
      return payload;
    } catch (e) {
      console.log('>>>errrr', e);
      return {
        statusCode: 500,
        message: e.message,
      };
    }
  }
}

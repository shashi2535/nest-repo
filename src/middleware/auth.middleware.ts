import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthenticationService } from 'src/helper/jwt.service';
import { IModifyRequest } from 'src/interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: AuthenticationService) {}
  async use(req: IModifyRequest, res: Response, next: NextFunction) {
    const data = req.headers.authorization;
    if (!data) {
      return res.json({
        statusCode: 401,
        message: 'unAuthorized',
      });
    }
    if (!data.startsWith('Bearer')) {
      return res.json({
        statusCode: 400,
        message: 'InValidToken',
      });
    }
    const [, token] = data.split(' ');
    const payload = await this.jwtService.tokenVerify(token);
    req.user = payload.id;
    next();
  }
}

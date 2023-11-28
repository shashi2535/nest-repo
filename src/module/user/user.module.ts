import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthenticationService } from 'src/helper/jwt.service';
import { User } from 'src/models';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ENV_CONSTANT } from 'src/constant';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_CONSTANT.JWT_SECRET),
        signOptions: {
          expiresIn: configService.get<string>(ENV_CONSTANT.EXPIRATION_DAY),
        },
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, AuthenticationService],
})
export class UserModule {}

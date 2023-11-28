import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { ENV_CONSTANT } from './constant';
import { AuthenticationService } from './helper/jwt.service';
import { AuthMiddleware } from './middleware';
import { Todo, User } from './models';
import { TodoModule } from './module/todo/todo.module';
import { UserModule } from './module/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: ENV_CONSTANT.DB_DILECT,
        host: configService.get<string>(ENV_CONSTANT.DB_HOST),
        port: configService.get<number>(ENV_CONSTANT.DB_PORT),
        username: configService.get<string>(ENV_CONSTANT.DB_USERNAME),
        password: configService.get<string>(ENV_CONSTANT.DB_PASSWORD),
        database: configService.get<string>(ENV_CONSTANT.DB_DATABASE),
        models: [User, Todo],
      }),
    }),
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
    UserModule,
    TodoModule,
  ],
  controllers: [],
  providers: [AuthenticationService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('todo');
  }
}

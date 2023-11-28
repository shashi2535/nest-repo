import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { IUser } from 'src/interface/user';
import { User } from '../../models';
@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private user: ModelCtor<User>) {}

  // Save user Data
  saveUserDetails(data: IUser) {
    return this.user.create(data);
  }
  // find user with condition
  checkUserByEmail(conditon: Partial<IUser>) {
    return this.user.findOne({ where: conditon, raw: true });
  }
}

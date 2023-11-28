import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Todo } from './todo';

@Table({
  tableName: 'user',
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Todo)
  todos: Todo[];
}

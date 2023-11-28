import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user';

@Table({
  tableName: 'todo',
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class Todo extends Model<Todo> {
  @Column
  title: string;

  @Column
  description: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, 'userId')
  user!: User;
}

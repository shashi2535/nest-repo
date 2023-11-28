import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { ITodo } from 'src/interface/user';
import { Todo, User } from '../../models';
@Injectable()
export class TodoRepository {
  constructor(@InjectModel(Todo) private todo: ModelCtor<Todo>) {}

  // Save user Data
  saveTodoDetails(data: ITodo) {
    return this.todo.create(data);
  }
  // find user with condition
  getTodoByCondition(conditon: Partial<ITodo>) {
    return this.todo.findAll({
      where: conditon,
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['name', 'email'],
          nested: true,
          all: true,
        },
      ],
      raw: true,
    });
  }
  // find one todo
  findOneTodoDetails(id: number) {
    return this.todo.findByPk(id);
  }
  //  delete one todo
  deleteTodoById(id: number) {
    return this.todo.destroy({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { ITodoCreateRes } from 'src/interface';
import { TodoCreateDto } from 'src/validation';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private todoRepo: TodoRepository) {}
  async createTodo(
    userId: number,
    todo: TodoCreateDto,
  ): Promise<ITodoCreateRes> {
    try {
      const checkTodo = await this.todoRepo.getTodoByCondition({
        title: todo.title.trim(),
      });
      if (checkTodo) {
        return {
          message: 'Todo Already Exist.',
        };
      }
      const todoData = await this.todoRepo.saveTodoDetails({
        userId: userId,
        ...todo,
      });
      return {
        message: 'Todo Created Successfully',
        data: todoData,
      };
    } catch (err) {
      return {
        statusCode: 500,
        message: err.message,
      };
    }
  }
  async getTodo(userId: number): Promise<ITodoCreateRes> {
    try {
      const todoData = await this.todoRepo.getTodoByCondition({ userId });
      return {
        statusCode: 200,
        message: 'Todo Get Successfully',
        data: todoData,
      };
    } catch (err) {
      return {
        statusCode: 500,
        message: err.message,
      };
    }
  }
  async deleteTodo(todoId: number): Promise<ITodoCreateRes> {
    try {
      const todoData = await this.todoRepo.findOneTodoDetails(todoId);
      if (!todoData) {
        return {
          statusCode: 400,
          message: 'Todo Not Found',
        };
      }
      await this.todoRepo.deleteTodoById(todoId);
      return {
        message: 'Todo Deleted Successfully',
      };
    } catch (err) {
      return {
        statusCode: 500,
        message: err.message,
      };
    }
  }
  async getTodoById(todoId: number): Promise<ITodoCreateRes> {
    try {
      const todoData = await this.todoRepo.findOneTodoDetails(todoId);
      if (!todoData) {
        return {
          statusCode: 400,
          message: 'Todo Not Found',
        };
      }
      return {
        message: 'Get Todo By Id Successfully',
        data: todoData,
      };
    } catch (err) {
      return {
        statusCode: 500,
        message: err.message,
      };
    }
  }
}

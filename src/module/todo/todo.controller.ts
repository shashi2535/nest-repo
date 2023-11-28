import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { IModifyRequest } from 'src/interface';
import { TodoCreateDto } from 'src/validation';
import { TodoService } from './todo.service';

@Controller('/')
export class TodoController {
  constructor(readonly todoService: TodoService) {}
  @Post('/todo')
  async addTodo(@Req() req: IModifyRequest, @Body() todo: TodoCreateDto) {
    try {
      return this.todoService.createTodo(req.user, todo);
    } catch (err) {
      return {
        statusCode: 500,
        message: err.message,
      };
    }
  }
  @Get('/todo')
  async getTodo(@Req() req: IModifyRequest) {
    try {
      return this.todoService.getTodo(req.user);
    } catch (err) {
      return {
        statusCode: 500,
        message: err.message,
      };
    }
  }
  @Delete('/todo/:id')
  async deleteTodoById(
    @Req() req: IModifyRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      return this.todoService.deleteTodo(Number(id));
    } catch (err) {
      return {
        statusCode: 500,
        message: err.message,
      };
    }
  }
  @Get('/todo/:id')
  async getTodoById(
    @Req() req: IModifyRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      return this.todoService.getTodoById(Number(id));
    } catch (err) {
      return {
        statusCode: 500,
        message: err.message,
      };
    }
  }
}

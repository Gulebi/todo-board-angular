import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { ITodo } from './todo.storage';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getTodos(): Promise<ITodo[]> {
    await this._sleep(1000);
    return this.appService.todoStore.getTodos();
  }

  @Post()
  async addTodo(@Body() todo: ITodo): Promise<ITodo> {
    await this._sleep(1000);
    return this.appService.todoStore.addTodo(todo);
  }

  @Put(':id')
  async UpdateTodo(@Param('id') id: string, @Body() todo: ITodo): Promise<ITodo> {
    await this._sleep(1000);
    return this.appService.todoStore.updateTodo(id, todo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<void> {
    await this._sleep(1000);
    this.appService.todoStore.deleteTodo(id);
  }

  private _sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, duration));
  }
}

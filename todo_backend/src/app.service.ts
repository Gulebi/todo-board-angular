import { Injectable } from '@nestjs/common';
import { TodoStorage } from './todo.storage';

@Injectable()
export class AppService {
  constructor(public todoStore: TodoStorage) {}
}

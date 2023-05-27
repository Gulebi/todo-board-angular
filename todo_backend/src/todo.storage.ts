import { Injectable } from '@nestjs/common';

export interface ITodo {
  id: string;
  text: string;
  isDone: boolean;
  pos: { x: number; y: number };
}

@Injectable()
export class TodoStorage {
  private _store: ITodo[] = [
    {
      id: '3eg5hr',
      text: 'Todo 1',
      isDone: false,
      pos: { x: 100, y: 100 },
    },
    {
      id: 'g544ge',
      text: 'Todo 2',
      isDone: true,
      pos: { x: 200, y: 250 },
    },
  ];

  public getTodos(): ITodo[] {
    return this._store;
  }

  public addTodo(todo: ITodo): ITodo {
    this._store.push(todo);
    return todo;
  }

  public updateTodo(id: string, todo: ITodo): ITodo {
    const found = this._store.find((x) => x.id === id);
    if (found != null) {
      found.text = todo.text;
      found.isDone = todo.isDone;
    }
    return found;
  }

  public deleteTodo(id: string): void {
    this._store = this._store.filter((x) => x.id !== id);
  }
}

import { Injectable } from "@angular/core";
import { ITodo, ITodoWithoutId } from "./todo.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class TodoService {
    private _apiUrl: string = "http://localhost:3000";
    private _todos$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);
    public readonly todos$: Observable<ITodo[]> = this._todos$.asObservable();

    constructor(private http: HttpClient) {
        this._fetchTodos();
    }

    addTodo(todo: ITodoWithoutId): void {
        const newTodo: ITodo = {
            id: this._generateId(),
            ...todo,
        };

        const currentTodos = this._todos$.getValue();
        this._todos$.next([...currentTodos, newTodo]);

        this.http.post<ITodo>(this._apiUrl, newTodo).subscribe();
    }

    updateTodo(todo: ITodo): void {
        const currentTodos = this._todos$.getValue();
        const updatedTodos = currentTodos.map((t) =>
            t.id === todo.id ? { ...t, text: todo.text, isDone: todo.isDone } : t
        );
        this._todos$.next(updatedTodos);

        const url = `${this._apiUrl}/${todo.id}`;
        this.http.put<ITodo>(url, todo).subscribe();
    }

    deleteTodo(todo: ITodo): void {
        const currentTodos = this._todos$.getValue();
        const updatedTodos = currentTodos.filter((t) => t.id !== todo.id);
        this._todos$.next(updatedTodos);

        const url = `${this._apiUrl}/${todo.id}`;
        this.http.delete(url).subscribe();
    }

    private _fetchTodos(): void {
        this.http
            .get<ITodo[]>(this._apiUrl)
            .pipe(
                tap((todos) => {
                    this._todos$.next(todos);
                })
            )
            .subscribe();
    }

    private _generateId(len: number = 6): string {
        return Math.random()
            .toString(36)
            .substring(2, len + 2);
    }
}

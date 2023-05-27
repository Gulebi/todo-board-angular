import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ITodo } from "../todo/todo.model";
import { TodoService } from "../todo/todo.service";
import { Subject, debounceTime } from "rxjs";

@Component({
    selector: "app-todo-card",
    templateUrl: "./todo-card.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
    private _debouncedSubject: Subject<ITodo> = new Subject();
    @Input() todoData!: ITodo;
    @Output() isEditingEvent: EventEmitter<boolean> = new EventEmitter();
    public isDeleted: boolean;

    constructor(private todoService: TodoService) {
        this.isDeleted = false;
        this._debouncedSubject.pipe(debounceTime(500)).subscribe((todo: ITodo) => {
            this.todoService.updateTodo(todo);
        });
    }

    deleteTodo(todo: ITodo, event: MouseEvent): void {
        event.stopPropagation();
        this.isDeleted = true;
        // eslint-disable-next-line no-restricted-globals
        setTimeout(() => {
            this.todoService.deleteTodo(todo);
        }, 1000);
    }

    todoChange(d?: boolean): void {
        this.todoData.isDone = !!d;

        this._debouncedSubject.next(this.todoData);
    }

    textFocus(): void {
        this.isEditingEvent.emit();
    }
}


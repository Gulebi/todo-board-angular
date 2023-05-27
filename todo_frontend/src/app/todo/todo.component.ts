import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { ITodo } from "./todo.model";
import { TodoService } from "./todo.service";

@Component({
    selector: "app-todo",
    templateUrl: "./todo.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
    public todos$$: Observable<ITodo[]> = this.todoService.todos$;
    public isEditing: boolean;

    constructor(private todoService: TodoService) {
        this.isEditing = false;
    }

    addTodo(event: MouseEvent): void {
        if (this.isEditing === true) {
            this.isEditing = false;
        } else {
            const pos = { x: event.clientX - (48 + 11), y: event.clientY };
            this.todoService.addTodo({ text: "Todo", pos, isDone: false });
        }
    }

    trackByFn(_index: number, todo: ITodo): string {
        return todo.id;
    }

    receiveIsEditing(): void {
        this.isEditing = true;
    }
}

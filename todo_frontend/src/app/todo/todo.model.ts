export interface ITodo {
    id: string;
    text: string;
    isDone: boolean;
    pos: { x: number; y: number };
}

export interface ITodoWithoutId {
    text: string;
    isDone: boolean;
    pos: { x: number; y: number };
}

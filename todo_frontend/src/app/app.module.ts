import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { TodoComponent } from "./todo/todo.component";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TodoCardComponent } from "./todo-card/todo-card.component";

@NgModule({
    declarations: [AppComponent, TodoComponent, TodoCardComponent],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot([]),
        NoopAnimationsModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DdrButtonComponent, DdrCardComponent, DdrInputComponent } from 'ddr-ng';
import { Todo } from './models/todo.model';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [ReactiveFormsModule, DdrButtonComponent, DdrCardComponent, DdrInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Todo List</h1>

    <ddr-card class="mb-3">
      <div card-title>Create a new todo</div>
      <div card-content>
        <form [formGroup]="todoForm" (ngSubmit)="createTodo()">
          <ddr-input label="Title" name="title" formControlName="title" />
          <ddr-input label="Description" name="description" formControlName="description" />
          <ddr-input label="Date" name="date" formControlName="date" />
          <ddr-button text="Create Todo" type="submit" />
        </form>
      </div>
    </ddr-card>

    @if (todos().length === 0) {
      <p class="text-secondary">No todos yet. Create one above!</p>
    }

    @for (todo of todos(); track todo.id) {
      <ddr-card class="mb-2">
        <div card-title>{{ todo.title }}</div>
        <div card-content>
          <p>{{ todo.description }}</p>
          <p>Date: {{ todo.date }}</p>
          <ddr-button text="Delete" mode="danger" (action)="deleteTodo(todo.id)" />
        </div>
      </ddr-card>
    }
  `,
})
export class TodoListComponent implements OnInit {
  private todoService = inject(TodoService);

  todos = signal<Todo[]>([]);
  todoForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(''),
  });

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  createTodo() {
    const { title, description, date } = this.todoForm.value;
    const body = { title: title ?? '', description: description ?? '', date: date ?? '' };
    this.todoService.createTodo(body).subscribe(() => {
      this.todoForm.reset();
      this.loadTodos();
    });
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }
}

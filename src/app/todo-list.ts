import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DdrButtonComponent, DdrCardComponent, DdrInputComponent } from 'ddr-ng';

interface Todo {
  id: string;
  title: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, DdrButtonComponent, DdrCardComponent, DdrInputComponent],
  template: `
    <h1>Todo List</h1>

    <ddr-card class="mb-3">
      <div card-title>Create a new todo</div>
      <div card-content>
        <form (ngSubmit)="createTodo()">
          <ddr-input label="Title" name="title" [(ngModel)]="title" />
          <ddr-input label="Description" name="description" [(ngModel)]="description" />
          <ddr-input label="Date" name="date" [(ngModel)]="date" />
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
  private http = inject(HttpClient);

  todos = signal<Todo[]>([]);
  title = '';
  description = '';
  date = '';

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<Todo[]>('/api/todos').subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  createTodo() {
    const body = { title: this.title, description: this.description, date: this.date };
    this.http.post<Todo>('/api/todos', body).subscribe(() => {
      this.title = '';
      this.description = '';
      this.date = '';
      this.loadTodos();
    });
  }

  deleteTodo(id: string) {
    this.http.delete(`/api/todos/${id}`).subscribe(() => {
      this.loadTodos();
    });
  }
}

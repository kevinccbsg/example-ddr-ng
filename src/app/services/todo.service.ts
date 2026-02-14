import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/api/todos');
  }

  createTodo(body: { title: string; description: string; date: string }): Observable<Todo> {
    return this.http.post<Todo>('/api/todos', body);
  }

  deleteTodo(id: string): Observable<unknown> {
    return this.http.delete(`/api/todos/${id}`);
  }
}

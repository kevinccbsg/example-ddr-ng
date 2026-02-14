import { Routes } from '@angular/router';
import { HelloWorldComponent } from './hello-world';
import { NotFoundComponent } from './not-found';
import { TodoListComponent } from './todo-list';

export const routes: Routes = [
  { path: '', component: HelloWorldComponent },
  { path: 'todos', component: TodoListComponent },
  { path: '**', component: NotFoundComponent },
];

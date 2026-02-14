import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./hello-world').then((m) => m.HelloWorldComponent) },
  { path: 'todos', loadComponent: () => import('./todo-list').then((m) => m.TodoListComponent) },
  { path: '**', loadComponent: () => import('./not-found').then((m) => m.NotFoundComponent) },
];

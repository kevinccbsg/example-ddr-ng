import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="container text-center mt-5">
      <h1>404</h1>
      <p>Page not found</p>
      <a routerLink="/" class="btn btn-primary">Go Home</a>
    </div>
  `,
  imports: [],
})
export class NotFoundComponent {}

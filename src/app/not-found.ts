import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="container text-center mt-5">
      <h1>404</h1>
      <p>Page not found</p>
      <a routerLink="/" class="btn btn-primary">Go Home</a>
    </div>
  `,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}

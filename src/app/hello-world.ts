import { Component, signal } from '@angular/core';
import { DdrButtonComponent } from 'ddr-ng';

@Component({
  selector: 'app-hello-world',
  imports: [DdrButtonComponent],
  template: `
    <h1>Welcome to TWD</h1>
    <p class="text-secondary mb-3">A demo app for in-browser testing with TWD.</p>
    <ddr-button [text]="'Count is ' + count()" (action)="increment()" />
  `,
})
export class HelloWorldComponent {
  count = signal(0);

  increment() {
    this.count.update((c) => c + 1);
  }
}

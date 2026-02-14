import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DdrButtonComponent } from 'ddr-ng';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DdrButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private router = inject(Router);

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}

import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  router = inject(Router);
  protected readonly title = signal('rob');
  menuSelected = signal(0)
  menuRoutes = ['home', 'work', 'mental', 'sleep', 'clothes']

  select(index: number) {
    this.menuSelected.set(index)
    this.router.navigate([this.menuRoutes[index]])
  }
}

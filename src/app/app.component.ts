import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeiroComponent } from './primeiro/primeiro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrimeiroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'game-launcher-app';
}




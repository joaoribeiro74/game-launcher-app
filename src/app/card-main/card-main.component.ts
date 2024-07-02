import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';
import { GamePageComponent } from '../game-page/game-page.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-main',
  standalone: true,
  imports: [CommonModule, MainPageComponent, GamePageComponent, RouterModule],
  templateUrl: './card-main.component.html',
  styleUrl: './card-main.component.css'
})
export class CardMainComponent {
  @Input() name?: string;
  @Input() price?: string;
  @Input() image?: string;
}

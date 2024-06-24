import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, MainPageComponent],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() image?: string;
  @Input() name?: string;
}

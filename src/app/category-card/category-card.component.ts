import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, MainPageComponent, RouterModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() image?: string;
  @Input() name?: string;
  @Input() categories:{ image: string, name: string }[] = [];
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MainCarouselComponent } from '../main-carousel/main-carousel.component';
import { MainPageComponent } from '../main-page/main-page.component';


@Component({
 selector: 'app-card',
 standalone: true,
 imports: [CommonModule, MainCarouselComponent, MainPageComponent],
 templateUrl: './card.component.html',
 styleUrl: './card.component.css'
})
export class CardComponent {
 @Input() title?: string;
 @Input() price?: string;
 @Input() image?: string;
 @Input() release?: string;
}

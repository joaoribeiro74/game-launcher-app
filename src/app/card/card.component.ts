import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
 selector: 'app-card',
 standalone: true,
 imports: [CommonModule],
 templateUrl: './card.component.html',
 styleUrl: './card.component.css'
})
export class CardComponent {
 @Input() title?: string;
 @Input() price?: string;
 @Input() image?: string;
 @Input() release?: string;
}

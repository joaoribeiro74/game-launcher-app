import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MainCarouselComponent } from '../main-carousel/main-carousel.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { RouterModule } from '@angular/router';


@Component({
 selector: 'app-card',
 standalone: true,
 imports: [CommonModule, MainCarouselComponent, MainPageComponent, RouterModule],
 templateUrl: './card.component.html',
 styleUrl: './card.component.css'
})
export class CardComponent {
    @Input() name: string = '';
    @Input() price: string = '';
    @Input() image: string = '';
    @Input() video: string = '';
    @Input() releaseDate: string = '';

    @ViewChild('videoElement') videoElement?: ElementRef<HTMLVideoElement>;

    ngAfterViewInit() {
      if (this.videoElement) {
        this.videoElement.nativeElement.muted = true;
      }
    }
}

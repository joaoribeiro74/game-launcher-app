import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { ApiService } from '../services/api.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-main-carousel',
  standalone: true,
  imports: [CommonModule, CardComponent, MainPageComponent, RouterModule],
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.css'
})
export class MainCarouselComponent implements OnInit {
  items: HTMLDivElement[] = [];
  currentPosition = 0;
  totalItems = 0;
  intervalId: any;
  interactionTimeout: any;
  indicators: any[] = [];
  @Input() image?: string;
  @Input() name?: string;
  @Input() price?: string;
  @Input() screenshots: string[] = [];
  @Input() currentGameIndex: number = 0;
  currentScreenshotIndex: number = -1;

  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  constructor() {}

  onMouseOver(index: number) {
    if (index >= 0 && index < this.screenshots.length) {
      this.image = this.screenshots[index];
      this.currentScreenshotIndex = index;
    }
  }

  onMouseOut() {
    this.image = this.image;
  }

  ngOnInit(): void {
    this.items = Array.from(document.querySelectorAll('#default-carousel [data-carousel-item]')) as HTMLDivElement[];
    this.totalItems = this.items.length;

    this.indicators = Array.from(document.querySelectorAll('#default-carousel [data-carousel-slide-to]'));

    this.indicators.forEach((indicator, index) => {
      indicator.setAttribute('aria-current', index === 0 ? 'true' : 'false');
    });

    const prevButton = document.querySelector('[data-carousel-prev]') as HTMLButtonElement;
    const nextButton = document.querySelector('[data-carousel-next]') as HTMLButtonElement;

    this.showSlide();

    this.startInterval();
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  startInterval(): void {
    this.intervalId = setInterval(() => {
      this.next.emit();
    }, 10000); 
  }

  clearInterval(): void {
    clearInterval(this.intervalId);
  }

  onNextClick() {
    this.clearInterval();
    this.next.emit(); 
    this.startInterval();
  }

  onPrevClick() {
    this.clearInterval();
    this.prev.emit(); 
    this.startInterval();
  }

  goTo(index: number) {
    this.currentPosition = index;
    this.showSlide();
  }

  showSlide() {
    this.items.forEach((item, index) => {
      if (index === this.currentPosition) {
        item.classList.remove('hidden');
        item.classList.add('block');
      } else {
        item.classList.remove('block');
        item.classList.add('hidden');
      }
    });

    this.indicators.forEach((indicator, i) => {
      indicator.setAttribute('aria-current', i === this.currentPosition ? 'true' : 'false');
    });
  }
}
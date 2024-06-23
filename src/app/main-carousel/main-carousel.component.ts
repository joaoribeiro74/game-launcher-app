import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-main-carousel',
  standalone: true,
  imports: [CommonModule, CardComponent, MainPageComponent],
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
  @Input() screenshots?: string[];

  constructor() {}

  ngOnInit(): void {
    this.items = Array.from(document.querySelectorAll('#default-carousel [data-carousel-item]')) as HTMLDivElement[];
    this.totalItems = this.items.length;

    this.indicators = Array.from(document.querySelectorAll('#default-carousel [data-carousel-slide-to]'));

    // Inicializa os indicadores corretamente
    this.indicators.forEach((indicator, index) => {
      indicator.setAttribute('aria-current', index === 0 ? 'true' : 'false');
    });

    // Inicializa os listeners dos botões de navegação
    const prevButton = document.querySelector('[data-carousel-prev]') as HTMLButtonElement;
    const nextButton = document.querySelector('[data-carousel-next]') as HTMLButtonElement;

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        this.prev();
        this.handleInteraction();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        this.next();
        this.handleInteraction();
      });
    }

    this.showSlide();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  next() {
    this.currentPosition = (this.currentPosition + 1) % this.totalItems;
    this.showSlide();
  }

  prev() {
    this.currentPosition = (this.currentPosition - 1 + this.totalItems) % this.totalItems;
    this.showSlide();
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

    // Atualiza a classe dos indicadores para refletir o slide atual
    this.indicators.forEach((indicator, i) => {
      indicator.setAttribute('aria-current', i === this.currentPosition ? 'true' : 'false');
    });
  }

  startAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    const interval = 20000; // intervalo em milissegundos
    this.intervalId = setInterval(() => {
      this.next();
    }, interval);
  }

  handleInteraction() {
    // Limpa o intervalo existente
    this.clearInterval();

    // Define um timeout para reiniciar o autoplay após 5 segundos de inatividade
    if (this.interactionTimeout) {
      clearTimeout(this.interactionTimeout);
    }
    this.interactionTimeout = setTimeout(() => {
      this.startAutoPlay();
    }, 3000);
  }

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
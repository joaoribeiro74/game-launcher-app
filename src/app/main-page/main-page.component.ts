import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MainCarouselComponent } from '../main-carousel/main-carousel.component';


@Component({
 selector: 'app-main-page',
 standalone: true,
 imports: [CommonModule, CardComponent, MainCarouselComponent],
 templateUrl: './main-page.component.html',
 styleUrl: './main-page.component.css'
})
export class MainPageComponent {
 card1 = { title: 'GRAND THEFT AUTO V', price: 'R$159,90', image: 'assets/resources/images/GTA.png', release: '14 de abr. de 2015'};
 card2 = { title: 'The Witcher 3: Wild Hunt', price: 'R$129,90', image: 'assets/resources/images/TheW3.png', release: '18 de mai. de 2015'};
 card3 = { title: 'Fallout 4', price: 'R$159,90', image: 'assets/resources/images/Fallout4.png', release: '10 de nov. de 2015'};
 card4 = { title: 'Red Dead Redemption 2', price: 'R$299,90', image: 'assets/resources/images/RDR22.png', release: '5 de dez. de 2019'};


carouselElement = document.getElementById('carousel-example');

items = [
    {
        position: 0,
        el: document.getElementById('carousel-item-1'),
    },
    {
        position: 1,
        el: document.getElementById('carousel-item-2'),
    },
    {
        position: 2,
        el: document.getElementById('carousel-item-3'),
    },
    {
        position: 3,
        el: document.getElementById('carousel-item-4'),
    },
];

// options with default values
options = {
    defaultPosition: 1,
    interval: 3000,

    indicators: {
        activeClasses: 'bg-white dark:bg-gray-800',
        inactiveClasses:
            'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
        items: [
            {
                position: 0,
                el: document.getElementById('carousel-indicator-1'),
            },
            {
                position: 1,
                el: document.getElementById('carousel-indicator-2'),
            },
            {
                position: 2,
                el: document.getElementById('carousel-indicator-3'),
            },
            {
                position: 3,
                el: document.getElementById('carousel-indicator-4'),
            },
        ],
    },

    // callback functions
    onNext: () => {
        console.log('next slider item is shown');
    },
    onPrev: () => {
        console.log('previous slider item is shown');
    },
    onChange: () => {
        console.log('new slider item has been shown');
    },
};

// instance options object
instanceOptions = {
  id: 'carousel-example',
  override: true
};
}

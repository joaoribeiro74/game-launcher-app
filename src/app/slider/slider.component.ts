import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, HostListener, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, CardComponent, MainPageComponent, RouterModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  @Input() games: { image: string, name: string, price: string }[] = [];
}

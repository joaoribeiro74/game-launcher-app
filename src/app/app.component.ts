import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { CardMainComponent } from './card-main/card-main.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditModalComponent } from './profile-edit-modal/profile-edit-modal.component';
import { GamePageComponent } from './game-page/game-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, RouterOutlet, MainCarouselComponent, NavbarComponent, FooterComponent, LoginComponent, RegisterComponent, CardComponent, MainPageComponent, HttpClientModule, CardMainComponent, ProfileComponent, ProfileEditModalComponent, GamePageComponent, CategoryPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'game-launcher-app';

}

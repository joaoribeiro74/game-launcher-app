import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TwoWayDatabindingComponent } from './two-way-databinding/two-way-databinding.component';
import { LoginComponent } from './login/login.component';
import { ChildComponent } from './child/child.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, NavbarComponent, FooterComponent, TwoWayDatabindingComponent, LoginComponent, ChildComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'game-launcher-app';
}

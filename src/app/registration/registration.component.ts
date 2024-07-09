import { Component } from '@angular/core';

/*import components*/ 
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    LoginComponent,
    SigninComponent
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  showCard: 'login' | 'signin' = 'login';
}

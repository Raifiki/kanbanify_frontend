import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Output() showRegisterCardEvent = new EventEmitter<'register'>();

  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  login(loginForm: NgForm){
    if (loginForm.valid) {
      console.log('send login data to server', loginForm.value);
      this.router.navigate(['/board']);
    }
  }

  showRegisterCard() {
    this.showRegisterCardEvent.emit('register');
  }
}

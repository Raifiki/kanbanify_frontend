import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  @Output() showLoginCardEvent = new EventEmitter<'login'>();

  constructor() { }

  signin(signinForm:NgForm){
    if (signinForm.valid) {
      console.log('send signin data to server', signinForm.value);
      this.showLoginCardEvent.emit('login');
    }
  }

  isPWmatching(signinForm:NgForm){
    return signinForm.value.password === signinForm.value.pwConfirm
  }

  showLoginCard(){
    this.showLoginCardEvent.emit('login');
  }

}

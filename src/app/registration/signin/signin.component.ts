import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  signin(signinForm:NgForm){
    if (signinForm.valid) {
      console.log('send signin data to server', signinForm.value);
    }
  }

  isPWmatching(signinForm:NgForm){
    return signinForm.value.password === signinForm.value.pwConfirm
  }

}

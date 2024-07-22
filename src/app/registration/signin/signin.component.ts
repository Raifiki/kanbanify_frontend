import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  @Output() showLoginCardEvent = new EventEmitter<'login'>();

  private http = inject(HttpClient)

  showRegisterError: boolean = false;
  serverResponse: any = '';
  constructor() { }

  async signin(signinForm:NgForm){
    if (signinForm.valid) {
      try {
        let registerData = this.getcleanBEJSONObj(signinForm);
        await this.sendRegisterRequest(registerData);
        this.showLoginCardEvent.emit('login');
      } catch (error) {
        console.log(error);
        
          if (error instanceof HttpErrorResponse) this.serverResponse = error.error;
          this.showRegisterError = true;
      }
    }
  }

  isPWmatching(signinForm:NgForm){
    return signinForm.value.password === signinForm.value.pwConfirm
  }

  showLoginCard(){
    this.showLoginCardEvent.emit('login');
  }

  sendRegisterRequest(registerData:{email:string, password:string, passwordRepeat:string, username:string, firstname:string, surename:string}) {
    let url = environment.serverUrl + 'user/';
    return lastValueFrom(this.http.post(url, registerData, {responseType: 'text'}))
  }

  getcleanBEJSONObj(signinForm:NgForm){
    return {
      email : signinForm.value.email, 
      password : signinForm.value.password, 
      passwordRepeat : signinForm.value.pwConfirm, 
      username : signinForm.value.username,
      firstname : signinForm.value.firstname,
      surename : signinForm.value.surename
    }
  }

}

import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

// import services
import { BoardService } from '../../services/board.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Output() showRegisterCardEvent = new EventEmitter<'register'>();

  private http = inject(HttpClient);

  showLoginError: boolean = false; 
  boardService = inject(BoardService);
  userService = inject(UserService);

  constructor(private router: Router) { }

  async login(loginForm: NgForm){
    if (loginForm.valid) {
      try {
        let resp:any = await this.loginWithEmailAndPassword(loginForm.value.email,loginForm.value.password);
        this.storeCredentials(resp.token, loginForm.value.email);
        this.boardService.getBoards();
        this.userService.getUsers();
        this.router.navigate(['/board']);
      } catch (error) {
        this.showLoginError = true;
      }
    }
  }

  showRegisterCard() {
    this.showRegisterCardEvent.emit('register');
  }

  loginWithEmailAndPassword(email:string , password:string) {
    let url = environment.serverUrl + 'login/';
    const data = { email, password };
    return lastValueFrom(this.http.post(url, data))
  }

  storeCredentials(token: string, email:string) {
    let credentials = { token, email };
    localStorage.setItem('credentials', JSON.stringify(credentials));
  }

}

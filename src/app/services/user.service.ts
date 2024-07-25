import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

// import models
import { Board, User } from '../../shared/utils/models';

// add variables
import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userList: WritableSignal<User[]> = signal([]);
  public signedInUser: WritableSignal<User> = signal(new User());

  private http = inject(HttpClient);

  constructor(private router: Router) {
    this.getUsers();
    this.signedInUser.set(this.getSignedInUser());
   }

   public getUsers(){
    let url = environment.serverUrl + 'user/';
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.getToken());
    lastValueFrom(this.http.get(url, { headers })).then((data) => {
      this.userList.set(this.getUserList(data));
    }).catch((err) => {
      if (err.status === 401) this.router.navigate(['register/']);
    });
   }

   private getToken(){
    let temp = localStorage.getItem('credentials')
    return (temp)? JSON.parse(temp).token : ''
  }

   private getUserList(userListBE:any): User[] {
    let userlist: User[] = [];
    if (userListBE instanceof Array) userListBE.forEach(userObjBE => userlist.push(this.getCleanUserObj(userObjBE)))
    return userlist;
   }

   private getCleanUserObj(objBE:any): User {
     return new User({ 
      name: objBE.first_name, 
      surename: objBE.last_name, 
      activeBoard: new Board(), 
      email: objBE.email,
      id: objBE.id,
    });
   }

   private getSignedInUser(){
     let credentials = localStorage.getItem('credentials');
     let email =  (credentials)? JSON.parse(credentials).email : '';
     let user = this.userList().find(user => user.email === email)
     return user || new User();
   }

   getUserByEmail(email:string): User|undefined {
     return this.userList().find(user => user.email === email);
   }
}

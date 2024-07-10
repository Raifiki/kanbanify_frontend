import { Injectable, signal, WritableSignal } from '@angular/core';

// import models
import { Board, User } from '../shared/utils/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userList: WritableSignal<User[]> = signal([]);
  public signedInUser: WritableSignal<User> = signal(new User());

  constructor() {
    this.userList.set([
      new User({name:'Max', surename:'Mustermann', activeBoard:new Board(), email:'user1@example.com'}),
      new User({name:'Hans', surename:'Hermann', activeBoard:new Board(), email:'user2@example.com'}),
      new User({name:'Peter', surename:'Petersen', activeBoard:new Board(), email:'user3@example.com'}),
      new User({name:'Lisa', surename:'Lisensen', activeBoard:new Board(), email:'user4@example.com'}),
      new User({name:'Hanna', surename:'Hannensen', activeBoard:new Board(), email:'user5@example.com'}),

    ])
    this.signedInUser.set(this.userList()[0]);

    setInterval(() => {
      if (true) {
        this.userList.update( userList => {
          userList[0].changeName('Leonardo');
          console.log('name changed');
          return userList
        })
      }
      
    },15000);
   }

   getUserByEmail(email:string): User|undefined {
     return this.userList().find(user => user.email === email);
   }
}

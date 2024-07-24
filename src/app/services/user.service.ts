import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

// import models
import { Board, User } from '../../shared/utils/models';

// add variables
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userList: WritableSignal<User[]> = signal([]);
  public signedInUser: WritableSignal<User> = signal(new User());

  private http = inject(HttpClient);

  constructor() {
    this.userList.set([
      new User({ name: 'Alice', surename: 'AliceSmith', activeBoard: new Board(), email: 'user1@example.com' }),
      new User({ name: 'Bob', surename: 'BobJohnson', activeBoard: new Board(), email: 'user2@example.com' }),
      new User({ name: 'Charlie', surename: 'CharlieBrown', activeBoard: new Board(), email: 'user3@example.com' }),
      new User({ name: 'David', surename: 'DavidBrown', activeBoard: new Board(), email: 'user4@example.com' }),
      new User({ name: 'Emily', surename: 'EmilyJones', activeBoard: new Board(), email: 'user5@example.com' }),
      new User({ name: 'Frank', surename: 'FrankWilliams', activeBoard: new Board(), email: 'user6@example.com' }),
      new User({ name: 'Grace', surename: 'GraceGreen', activeBoard: new Board(), email: 'user7@example.com' }),
      new User({ name: 'Henry', surename: 'HenryBrown', activeBoard: new Board(), email: 'user8@example.com' }),
      new User({ name: 'Isabella', surename: 'IsabellaDavis', activeBoard: new Board(), email: 'user9@example.com' }),
      new User({ name: 'Jack', surename: 'JackWilson', activeBoard: new Board(), email: 'user10@example.com' }),
      new User({ name: 'Kate', surename: 'KateWilson', activeBoard: new Board(), email: 'user11@example.com' }),
      new User({ name: 'Lucy', surename: 'LucyDavis', activeBoard: new Board(), email: 'user12@example.com' }),
      new User({ name: 'Mike', surename: 'MikeJohnson', activeBoard: new Board(), email: 'user13@example.com' }),
      new User({ name: 'Nancy', surename: 'NancyGreen', activeBoard: new Board(), email: 'user14@example.com' }),
      new User({ name: 'Oliver', surename: 'OliverBrown', activeBoard: new Board(), email: 'user15@example.com' }),
      new User({ name: 'Patrick', surename: 'PatrickDavis', activeBoard: new Board(), email: 'user16@example.com' }),
      new User({ name: 'Quentin', surename: 'QuentinWilson', activeBoard: new Board(), email: 'user17@example.com' }),
      new User({ name: 'Rachel', surename: 'RachelBrown', activeBoard: new Board(), email: 'user18@example.com' }),
      new User({ name: 'Sarah', surename: 'SarahJohnson', activeBoard: new Board(), email: 'user19@example.com' }),
      new User({ name: 'Thomas', surename: 'ThomasGreen', activeBoard: new Board(), email: 'user20@example.com' }),
      new User({ name: 'Ursula', surename: 'UrsulaDavis', activeBoard: new Board(), email: 'user21@example.com' }),
      new User({ name: 'Victor', surename: 'VictorBrown', activeBoard: new Board(), email: 'user22@example.com' }),
      new User({ name: 'Wanda', surename: 'WandaGreen', activeBoard: new Board(), email: 'user23@example.com' }),
      new User({ name: 'Xander', surename: 'XanderWilson', activeBoard: new Board(), email: 'user24@example.com' }),
      new User({ name: 'Yvonne', surename: 'YvonneJohnson', activeBoard: new Board(), email: 'user25@example.com' })
    ])
    this.getUsers();
    this.signedInUser.set(this.getSignedInUser());

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

   private getUsers(){
    let url = environment.serverUrl + 'user/';
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.getToken());
    lastValueFrom(this.http.get(url, { headers })).then((data) => {
      this.userList.set(this.getUserList(data));
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

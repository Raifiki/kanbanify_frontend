import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { timeInterval } from 'rxjs';

// import models
import { Board, User } from '../shared/utils/models';

// impomrt services
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  public boardList: WritableSignal<Board[]> = signal([]);
  public selectedBoard: WritableSignal<Board>  = signal(new Board());

  private userService = inject(UserService);

  constructor() {
        //delete at end start
        this.boardList.set([
          this.getCleanBoardObj({name:'Board 1', emailList:['user1@example.com','user2@example.com']}),
          this.getCleanBoardObj({name:'Board 2', emailList:['user3@example.com','user4@example.com']}),
          this.getCleanBoardObj({name:'Board 3', emailList:['user5@example.com']}),
        ]);
        this.selectBoard(this.boardList()[0])
        setInterval(()=>{
          if (false) {
            this.boardList.update( boardList => {
              boardList.push(new Board({name:'From Timer', members:[]}))
              boardList[0].name = 'Changed';
              return boardList
            });   
          }
        },10000);
        // delete at end end
  }

  selectBoard(board: Board) {
    this.selectedBoard.set(board);
  }

  getCleanBoardObj(obj:any){
    let boardJson = {
      name: obj.name,
      members: this.getMembers(obj.emailList)
    }
    return new Board(boardJson);
  }

  getMembers(emailList:string[]): User[]{
    let userList:User[] = [];
    emailList.forEach(email => {
      let user =this.userService.getUserByEmail(email);
      if(user) userList.push(user);
    })
    return userList;
  }

}

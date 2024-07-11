import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { timeInterval } from 'rxjs';

// import models
import { Board, Category, User } from '../shared/utils/models';

// impomrt services
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  public boardList: WritableSignal<Board[]> = signal([]);
  public selectedBoard: WritableSignal<Board>  = signal(new Board());

  public categoryList: WritableSignal<string[]> = signal([]);

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
          } else if(false) {
            this.selectedBoard.update(board => {
              board.name = 'Changed';
              board.categories[0].name = 'Changed';
              let temp = board.categories[0];
              board.categories[0] = board.categories[1];
              board.categories[1] = temp;
              return board
            })
          }
        },10000);
        // delete at end end
  }

  selectBoard(board: Board) {
    this.selectedBoard.set(board);
  }

  private getCleanBoardObj(obj:any){
    let boardJson = {
      name: obj.name,
      members: this.getMembers(obj.emailList),
      categories: this.getCategories()
    }
    return new Board(boardJson);
  }

  private getMembers(emailList:string[]): User[]{
    let userList:User[] = [];
    emailList.forEach(email => {
      let user =this.userService.getUserByEmail(email);
      if(user) userList.push(user);
    })
    return userList;
  }

  public addNewBoard(name:string){
    let userEmail = this.userService.signedInUser().email;
    let newBoard = this.getCleanBoardObj({name, emailList:[userEmail]});
    this.boardList.update( boardList => {
      boardList.push(newBoard);
      return boardList;
    });
    this.selectBoard(newBoard);
  }

  public deleteBoard(board:Board){
    this.boardList.update( boardList => {
      let idx = boardList.findIndex( b => b === board);
      boardList.splice(idx, 1);
      return boardList
    })
    // ToDo: Delete Board on Server
    if (this.boardList().length > 0) {
      this.selectBoard(this.boardList()[0]);
    } else {
      this.selectBoard(new Board());
    }
  }

  private getCategories(){
    return [
      new Category('ToDo', true),
      new Category('In Progress',true),
      new Category('Done',true),
    ];
  }

  public deleteCategory(category:Category) {
    this.selectedBoard.update(board => {
      let idx = board.categories.findIndex( cat => cat === category);
      board.categories.splice(idx, 1);
      return board
    })
    this.updateBoardOnServer();
  }

  private updateBoardOnServer(){
    // todo update board + Category on server
  }

  public addCategory(){
    this.selectedBoard.update(board => {
      board.categories.push(new Category('NewCategory'));
      return board
    })
  }
}

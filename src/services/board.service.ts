import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { timeInterval } from 'rxjs';

// import models
import { Board, User } from '../shared/utils/models';

// impomrt services
import { UserService } from './user.service';
import { LabelService } from './label.service';
import { TaskService } from './task.service';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  public boardList: WritableSignal<Board[]> = signal([]);
  public selectedBoard: WritableSignal<Board>  = signal(new Board());

  public categoryList: WritableSignal<string[]> = signal([]);

  private categoryService = inject(CategoryService);
  private labelService = inject(LabelService);
  private userService = inject(UserService);
  private taskService = inject(TaskService);

  constructor() {
        //delete at end start
        this.boardList.set([
          this.getCleanBoardObj({name:'Board 1',id:'ABC', emailList:[
            'user1@example.com',
            'user2@example.com',
            'user3@example.com',
            'user4@example.com'
          ]}),
          this.getCleanBoardObj({name:'Board 2',id:'CDE', emailList:[
            'user5@example.com',
            'user6@example.com',
            'user7@example.com',
            'user8@example.com',
            'user9@example.com',
            'user10@example.com',
            'user11@example.com'
          ]}),
          this.getCleanBoardObj({name:'Board 3',id:'EFG', emailList:[
            'user12@example.com',
            'user13@example.com',
            'user14@example.com',
            'user15@example.com',
            'user16@example.com',
            'user17@example.com',
            'user18@example.com',
            'user19@example.com',
            'user20@example.com',
            'user21@example.com',
            'user22@example.com',
            'user23@example.com',
            'user24@example.com',
            'user25@example.com'
          ]}),
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
              let temp = board.categories[0];
              return board
            })
          }
        },10000);
        // delete at end end
  }

  selectBoard(board: Board) {
    this.selectedBoard.set(board);
    this.labelService.getLabels(this.selectedBoard());
    this.categoryService.getCategories(this.selectedBoard());
    this.taskService.getTasks(this.selectedBoard());
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
      'ToDo', 
      'In Progress',
      'Done',
    ];
  }


  private updateBoardCategory(){
    // todo update board + Category on server
  }


  public updateBoardMembers(memberList:User[]){
    this.selectedBoard.update(board => {
      board.members = memberList;
      return board
    })
    // todo update board on server + users
  }

  public getBoard(boardId:string):Board | undefined{
    return this.boardList().find(board => board.id === boardId);
  }
}

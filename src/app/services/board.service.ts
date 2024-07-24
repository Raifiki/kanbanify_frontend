import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { lastValueFrom, timeInterval } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import models
import { Board, User } from '../../shared/utils/models';

// impomrt services
import { UserService } from './user.service';
import { LabelService } from './label.service';
import { TaskService } from './task.service';
import { CategoryService } from './category.service';

// import variables
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  public boardList: WritableSignal<Board[]> = signal([new Board()]);
  public selectedBoard: WritableSignal<Board>  = signal(new Board());

  public categoryList: WritableSignal<string[]> = signal([]);

  private categoryService = inject(CategoryService);
  private labelService = inject(LabelService);
  private userService = inject(UserService);
  private taskService = inject(TaskService);

  private http = inject(HttpClient);
  private boardURL  = environment.serverUrl + 'board/';

  constructor() {
        this.getBoards();
  }

  private getBoards(boardId?: number) {
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.getToken());
    lastValueFrom(this.http.get(this.boardURL, { headers })).then((data) => {
      if (data instanceof Array) this.boardList.set(this.getBoardList(data));
      if(this.boardList().length > 0) {
        if (boardId) this.selectBoardById(boardId)
        else this.selectBoard(this.boardList()[0])
      } 
      else this.selectBoard(new Board());
    });
  }

  private getToken(){
    let temp = localStorage.getItem('credentials')
    return (temp)? JSON.parse(temp).token : ''
  }

  private getBoardList(boardListBE:any): Board[] {
    let boardlist: Board[] = [];
    if (boardListBE instanceof Array) boardListBE.forEach(boardObjBE => boardlist.push(this.getCleanBoardObj(boardObjBE)))
    return boardlist;
   }

  selectBoard(board: Board) {
    this.selectedBoard.set(board);
    this.labelService.getLabels(this.selectedBoard());
    this.categoryService.getCategories(this.selectedBoard());
    this.taskService.getTasks(this.selectedBoard());
  }

  private selectBoardById(boardId: number) {
    let board = this.boardList().find(board => board.id == boardId)
    if(board) this.selectBoard(board)
  }

  private getCleanBoardObj(obj:any){
    let boardJson = {
      name: obj.title,
      members: this.getMembers(obj.members),
      categories: this.getCategories(),
      id: obj.id
    }
    return new Board(boardJson);
  }

  private getMembers(memberList:any[]): User[]{
    let userList:User[] = [];
    memberList.forEach(member => {
      let user =this.userService.getUserByEmail(member.email);
      if(user) userList.push(user);
    })
    return userList;
  }

  public addNewBoard(name:string){
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.getToken());
    const body = {'title': name}
    lastValueFrom(this.http.post(this.boardURL, body,{ headers })).then((data:any) => {
      this.getBoards(data.id);
    })
  }

  public deleteBoard(board:Board){
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.getToken());
    const url = this.boardURL + board.id + '/';
    lastValueFrom(this.http.delete(url, { headers, responseType: 'text' } )).then((data:any) => {
      this.getBoards();
    })
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
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.getToken());
    const body = {members: memberList.map(member => member.id)}
    let url = this.boardURL + this.selectedBoard().id + '/';
    lastValueFrom(this.http.put(url, body,{ headers })).then((data) => {
      this.selectedBoard.update(board => {
        board.members = this.getCleanBoardObj(data).members;
        return board
      })
    });
  }

  //public getBoard(boardId:string):Board | undefined{
  //  return this.boardList().find(board => board.id === boardId);
  //}
}

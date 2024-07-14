import { Component, computed, inject, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';

// import models
import { Board, User } from '../../../shared/utils/models';

//import services
import { BoardService } from '../../../services/board.service';
import { ControllService } from '../../../services/controll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  boardService = inject(BoardService);
  ctrlService = inject(ControllService);

  selectedBoard: Signal<Board> = signal(new Board());

  userSearchList: Signal<User[]> = signal([]);

  constructor(private router:Router){
    this.selectedBoard = computed(()=>{
      return this.boardService.selectedBoard()});

    this.userSearchList = computed(()=>{
      return this.ctrlService.userTaskSearch()});
    
  }

  logout(){
    console.log(this.selectedBoard());
    this.router.navigate(['/register']);
  }

  deleteBoard(){
    this.boardService.deleteBoard(this.selectedBoard());
  }

  toggleUserAtSearchList(user:User){
    if(!this.userSearchList().includes(user)){
      this.userSearchList().push(user);
    } else{
      this.userSearchList().splice(this.userSearchList().indexOf(user), 1);
    }
    this.ctrlService.userTaskSearch.set(this.userSearchList());
  }
}

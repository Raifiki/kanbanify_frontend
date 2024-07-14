import { Component, computed, inject, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';

// import models
import { Board, User } from '../../../shared/utils/models';

//import services
import { BoardService } from '../../../services/board.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  boardService = inject(BoardService);

  selectedBoard: Signal<Board> = signal(new Board());

  constructor(private router:Router){
    this.selectedBoard = computed(()=>{
      return this.boardService.selectedBoard()});
  }

  logout(){
    console.log(this.selectedBoard());
    this.router.navigate(['/register']);
  }

  deleteBoard(){
    this.boardService.deleteBoard(this.selectedBoard());
  }
}

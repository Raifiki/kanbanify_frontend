import { Component, computed, inject, signal, Signal } from '@angular/core';

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

  constructor(){
    this.selectedBoard = computed(()=>this.boardService.selectedBoard());
  }

  temp(){
    console.log(this.selectedBoard());
    
  }
}

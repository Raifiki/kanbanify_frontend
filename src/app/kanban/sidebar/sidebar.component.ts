import { Component, computed, inject, signal, Signal } from '@angular/core';

// import models
import { Board } from '../../../shared/utils/models';

// import services
import { BoardService } from '../../../services/board.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  boardList: Signal<Board[]> = signal([]);
  selectedBoard: Signal<Board> = signal(new Board());

  newBoardName: string = '';

  boardService = inject(BoardService);

  constructor() { 
    this.boardList = computed(()=>{return this.boardService.boardList()});
    this.selectedBoard = computed(()=>{
      return this.boardService.selectedBoard()
    });
  }

  selectBoard(board: Board) {
    this.boardService.selectBoard(board);
  }

  addBoard() {
    if(this.isBoardNameValid(this.newBoardName) && this.newBoardName.length > 0) {
      this.boardService.addNewBoard(this.newBoardName)
      this.newBoardName = '';
    };
  }

  isBoardNameValid(name: string) {
    return this.boardList().filter(board => board.name === name).length === 0;
  }

}

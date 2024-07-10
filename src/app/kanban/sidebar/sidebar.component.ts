import { Component } from '@angular/core';

// import models
import { Board } from '../../../shared/utils/models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  boardList: Board[] = [];
  selectedBoard: Board = {} as Board;

  constructor() { 
    //delete at end start
    this.boardList = [
      new Board('Test Board 1'),
      new Board('Board 2'),
      new Board('Und noch ein länger Name des Board 3'),
    ]
    this.selectedBoard = this.boardList[1];
    // delete at end end
  }

  selectBoard(board: Board) {
    this.selectedBoard = board;
  }

}

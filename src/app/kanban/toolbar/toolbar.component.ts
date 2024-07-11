import { Component, inject } from '@angular/core';

// import services
import { BoardService } from '../../../services/board.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  boardService = inject(BoardService);

  constructor() { };

  addCategory() {
    this.boardService.addCategory();
  }
}

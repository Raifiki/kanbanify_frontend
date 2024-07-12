import { Component, inject } from '@angular/core';

// import services
import { BoardService } from '../../../services/board.service';
import { ControllService } from '../../../services/controll.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  boardService = inject(BoardService);
  ctrlService = inject(ControllService);

  constructor() { };

  addCategory() {
    this.boardService.addCategory();
  }

  showOvlyAddUser() {
    this.ctrlService.setOverlayType('addMember');
    this.ctrlService.setShowOverlay(true);
  }

  showOvlyAddTask(){
    this.ctrlService.setOverlayType('addTask');
    this.ctrlService.setShowOverlay(true);
  }

}

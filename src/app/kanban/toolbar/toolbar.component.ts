import { Component, inject } from '@angular/core';

// import services
import { BoardService } from '../../services/board.service';
import { ControllService } from '../../services/controll.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  categoryService = inject(CategoryService);
  ctrlService = inject(ControllService);
  boardService = inject(BoardService);

  constructor() { };

  addCategory() {
    this.categoryService.addCategory(this.boardService.selectedBoard());
  }

  showOvlyAddUser() {
    this.ctrlService.setOverlayType('addMember');
    this.ctrlService.setShowOverlay(true);
  }

  showOvlyAddTask(){
    this.ctrlService.setOverlayType('addTask');
    this.ctrlService.setShowOverlay(true);
  }

  setSearchPrompt(prompt: string) {
    this.ctrlService.searchPrompt.set(prompt.toLowerCase());
  }

}

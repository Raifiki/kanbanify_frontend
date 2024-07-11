import { Component, computed, inject, signal, Signal } from '@angular/core';

// import services
import { BoardService } from '../../../services/board.service';

// import models
import { Board, Category } from '../../../shared/utils/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  board:Signal<Board> = signal(new Board());

  boardService = inject(BoardService);

  constructor(){
    this.board = computed(()=>{
      let board = this.boardService.selectedBoard();
      return board});
  }

  changeCategoryName(category: Category){
    if(this.isCategoryNameValid(category.name)){
      // ToDo: update Categorry and board on server, changes are already saved in Object
      category.notUpdatedOnSercer = false;
    }
  }


  deleteCategory(category:Category){
    this.boardService.deleteCategory(category);
  }

  isCategoryNameValid(name: string){
    return this.board().categories.filter(category => category.name === name).length === 1 && name !== 'NewCategory';
  }

}

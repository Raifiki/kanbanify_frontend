import { Component, computed, inject, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import services
import { BoardService } from '../../../services/board.service';
import { CategoryService } from '../../../services/category.service';

// import models
import { Board, Category, Task } from '../../../shared/utils/models';
import { TaskService } from '../../../services/task.service';

// import components
import { TaskCardComponent } from './task-card/task-card.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    FormsModule,
    TaskCardComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  board:Signal<Board> = signal(new Board());
  categories:Signal<Category[]> = signal([]);
  tasks:Signal<Task[]> = signal([]);

  categoryService = inject(CategoryService);
  boardService = inject(BoardService);
  taskService = inject(TaskService);

  constructor(){
    this.board = computed(()=>{
      let board = this.boardService.selectedBoard();
      return board});

    this.categories = computed(()=>{
      let categories = this.categoryService.categories();
      return categories});

      this.tasks = computed(()=>{
        let tasks = this.taskService.taskList();
        return tasks
      });
  }

  changeCategoryName(category: Category){
    if(this.isCategoryNameValid(category.name)){
      // ToDo: update Categorry and board on server, changes are already saved in Object
      category.notUpdatedOnSercer = false;
    }
  }


  deleteCategory(category:Category){
    this.categoryService.deleteCategory(category);
  }

  isCategoryNameValid(name: string){
    return this.categories().filter(category => category.name === name).length === 1 && name !== 'NewCategory';
  }

  getTasksByCategory(category:Category):Task[]{
    return this.tasks().filter(task => task.category === category);
  }

}

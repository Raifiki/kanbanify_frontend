import { Component, computed, inject, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import services
import { BoardService } from '../../services/board.service';
import { CategoryService } from '../../services/category.service';
import { ControllService } from '../../services/controll.service';
import { TaskService } from '../../services/task.service';

// import models
import { Board, Category, Task, User } from '../../../shared/utils/models';

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
  controlService = inject(ControllService);

  searchPrompt: Signal<string> = signal('');
  userTaskSearchList: Signal<User[]> = signal([]);

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

      this.searchPrompt = computed(()=>{
        let searchPrompt = this.controlService.searchPrompt();
        return searchPrompt;
      })

      this.userTaskSearchList = computed(()=>{
        let userTaskSearchList = this.controlService.userTaskSearch();
        return userTaskSearchList;
      })
  }

  changeCategoryName(category: Category){
    if(this.isCategoryNameValid(category.name)){
      this.categoryService.updateCategory(category, this.boardService.selectedBoard());
      category.notUpdatedOnSercer = false;
    }
  }


  deleteCategory(category:Category){
    this.categoryService.deleteCategory(category, this.boardService.selectedBoard());
  }

  isCategoryNameValid(name: string){
    return this.categories().filter(category => category.name === name).length === 1 && name !== 'NewCategory';
  }

  getTasksByCategory(category:Category):Task[]{
    return this.tasks().filter(task => task.category.id === category.id);
  }

  getTasksBySearchPrompt(tasks: Task[]): Task[]{
    return tasks.filter(task => task.title.toLowerCase().includes(this.searchPrompt()));
  }

  getTasksByMember(tasks: Task[]): Task[]{
    return (this.userTaskSearchList().length > 0)?tasks.filter(task => this.userTaskSearchList().includes(task.assignedTo)) : tasks ;
  }

  filterTask(category:Category):Task[]{
    return this.getTasksByMember(this.getTasksBySearchPrompt(this.getTasksByCategory(category)));
  }

}

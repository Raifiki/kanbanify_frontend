import { Component, computed, inject, Input, signal, Signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// import models
import { Category, Label, Task, User } from '../../../../shared/utils/models';

//import services
import { BoardService } from '../../../services/board.service';
import { ControllService } from '../../../services/controll.service';
import { LabelService } from '../../../services/label.service';
import { CategoryService } from '../../../services/category.service';
import { TaskService } from '../../../services/task.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() taskOverlayType!: 'create' | 'edit';
  task: Signal<Task> = signal(new Task());

  categoryService = inject(CategoryService);
  labelService = inject(LabelService);
  boardService = inject(BoardService);
  controlService = inject(ControllService);
  taskService = inject(TaskService);
  userService = inject(UserService);

  members:Signal<User[]> = signal([]);
  categories: Signal<Category[]> = signal([]);
  labels: Signal<Label[]> = signal([]);

  showDDAssignedTo:boolean = false;
  showDDCategory:boolean = false;
  showDDLabel:boolean = false;

  constructor() {
    this.members = computed(()=>{return this.boardService.selectedBoard().members;});
    this.task = computed(() => {
      let task = new Task({category: this.categoryService.categories()[0]});
      if (this.taskOverlayType == 'edit') {
        task = new Task(this.controlService.selectedTask());
      }
      return task;
    });
    this.categories = computed(() => {return this.categoryService.categories();});
    this.labels = computed(() => {return this.labelService.labels();});
  }
  
  createTask(form:NgForm) {
    console.log('Moin',this.task());
    if (this.taskOverlayType == 'create') {
      this.addMissingTaskDetails();
      this.taskService.createTask(this.task());
    } else {
      let selTaskObj = this.controlService.selectedTask();
      selTaskObj =Object.assign( selTaskObj,this.task());
    }
    form.reset();
    this.controlService.initOverlay();
    this.controlService.setSelectedTask(new Task());
    
  }

  removeTask(){
    this.taskService.removeTask(this.controlService.selectedTask());
    this.controlService.initOverlay();
  }

  private addMissingTaskDetails(){
    this.task().board = this.boardService.selectedBoard();
    this.task().createdFrom = this.userService.signedInUser();
    this.task().createdAt = new Date();
  }

  selectMember(member:User){
    this.task().assignedTo = member;
  }

  selectCategory(category:Category){
    this.task().category = category;
  }

  selectLabel(label:Label){
    this.task().label = label;
  }

  toggleDDAssignedTo(e:Event){
    this.showDDCategory = false;
    this.showDDLabel = false;
    e.stopPropagation();
    this.showDDAssignedTo = !this.showDDAssignedTo;
  }


  toggleDDCategory(e:Event){
    this.showDDAssignedTo = false;
    this.showDDLabel = false;
    e.stopPropagation();
    this.showDDCategory = !this.showDDCategory;
  }


  toggleDDLabel(e:Event){
    e.stopPropagation();
    this.showDDAssignedTo = false;
    this.showDDCategory = false;
    this.showDDLabel = !this.showDDLabel;
  }


  closeDropdowns(){
    this.showDDAssignedTo = false;
    this.showDDCategory = false;
    this.showDDLabel = false;
  }

  cancel(form:NgForm){
    form.reset();
    this.controlService.initOverlay();
    //todo: handle cancel of edit task
  }

}

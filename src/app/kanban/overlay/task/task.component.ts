import { Component, computed, inject, Input, signal, Signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// import models
import { Category, Label, Task, User } from '../../../../shared/utils/models';

//import services
import { BoardService } from '../../../../services/board.service';
import { ControllService } from '../../../../services/controll.service';
import { LabelService } from '../../../../services/label.service';
import { CategoryService } from '../../../../services/category.service';

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

  members:Signal<User[]> = signal([]);
  categories: Signal<Category[]> = signal([]);
  labels: Signal<Label[]> = signal([]);

  showDDAssignedTo:boolean = false;
  showDDCategory:boolean = false;
  showDDLabel:boolean = false;

  constructor() {
    this.members = computed(()=>{return this.boardService.selectedBoard().members;});
    this.task = computed(() => {return this.controlService.selectedTask();});
    this.categories = computed(() => {return this.categoryService.categories();});
    this.labels = computed(() => {return this.labelService.labels();});
   }

  createTask(form:NgForm) {
    if (this.taskOverlayType == 'create') {
      console.log('test');
      
      console.log(this.task());
      // ad mssing information to new Task
    } else {
      
    }
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

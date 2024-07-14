import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// import models
import { Task } from '../../../../shared/utils/models';

//import services
import { ControllService } from '../../../../services/controll.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task: Task = new Task();

  controlService = inject(ControllService);

  constructor() {}

  isDueDatePassed() {
    return (this.task.dueDate)? new Date(this.task.dueDate) < new Date(): false;
  }

  editTask(){
    // nochmal überabeiten
    this.controlService.setOverlayType('editTask');
    this.controlService.setShowOverlay(true);
    this.controlService.setSelectedTask(this.task);
    // ToDo edit task mit deep Copy machen
  }

}

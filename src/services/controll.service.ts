import { inject, Injectable, signal, WritableSignal } from '@angular/core';

// import types and interfaces
import { OverlayState } from '../shared/utils/interfaces';

// import models
import { Task, User } from '../shared/utils/models';

// import services
import { BoardService } from './board.service';
import { CategoryService } from './category.service';


@Injectable({
  providedIn: 'root'
})
export class ControllService {
  overlayType: WritableSignal<OverlayState> = signal('addTask');
  showOverlay: WritableSignal<boolean> = signal(false);

  boardService = inject(BoardService);
  categoryService = inject(CategoryService);

  selectedMembers: User[] = [];
  selectedTask: WritableSignal<Task> = signal(new Task());

  searchPrompt: WritableSignal<string> = signal('');
  userTaskSearch: WritableSignal<User[]> = signal([]);

  constructor() { 
    this.initOverlay();
  }

  public setOverlayType(ovlyType: OverlayState){
    this.overlayType.set(ovlyType);
  }

  public setShowOverlay(show: boolean){
    this.showOverlay.set(show);
    if (!show) {
      this.initSelectedMembers();
    }
  }

  private initSelectedMembers(){
    this.deepCopyBoardMemberList();
  }

  private deepCopyBoardMemberList(){
    this.selectedMembers = [];
    this.boardService.selectedBoard().members.forEach(member => this.selectedMembers.push(member))
  }

  public setSelectedTask(task: Task){
    this.selectedTask.set(task);
  }

  public initOverlay(){
    this.deepCopyBoardMemberList();
    this.setOverlayType('addTask');
    this.setShowOverlay(false);
    this.setSelectedTask(new Task({category: this.categoryService.categories()[0]}));
    this.searchPrompt.set('');
    this.userTaskSearch.set([]);
  }
}

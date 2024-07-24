import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

// inport models
import { Board, Category, Task } from '../../shared/utils/models';

// import services
import { LabelService } from './label.service';
import { UserService } from './user.service';
import { CategoryService } from './category.service';

// import variables
import { environment } from '../../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskList: WritableSignal<Task[]> = signal([]);

  labelService = inject(LabelService);
  categoryService = inject(CategoryService);
  userService = inject(UserService);

  private http = inject(HttpClient);
  private taskURL  = environment.serverUrl + 'task/';

  constructor() { 
  }
  
  public getTasks(board:Board){
    const url = this.taskURL + '?board=' + board.id;
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.getToken());
    if(board.name.length == 0) return
    lastValueFrom(this.http.get(url, { headers })).then((data) => {
      if (data instanceof Array) this.taskList.set(this.getTaskList(data));
    })
  }




  private getToken(){
    let temp = localStorage.getItem('credentials')
    return (temp)? JSON.parse(temp).token : ''
  }


  private getTaskList(taskListBE:any): Task[]{
    let taskList: Task[] = [];
    if(taskListBE instanceof Array) taskListBE.forEach(taskObjBE => taskList.push(this.getCleanTaskObj(taskObjBE)));
    return taskList
  }

  public createTask(newTask: Task, board:Board) {
    const url = this.taskURL + '?board=' + board.id;
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.getToken());
    const body = newTask.getBEJson();
    if(board.name.length == 0) return
    lastValueFrom(this.http.post(url, body, { headers })).then((data) => {
      this.getTasks(board);
    })
  }


  updateTask(task: Task, board: Board) {
    const url = this.taskURL + task.id + '/' + '?board=' + board.id;
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.getToken());
    const body = task.getBEJson();
    if(board.name.length == 0) return
    lastValueFrom(this.http.put(url, body, { headers })).then((data) => {
      this.getTasks(board);
    })
  }

  public removeTask(task: Task, board: Board) {
    const url = this.taskURL+ task.id + '/' + '?board=' + board.id;
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.getToken());
    if(board.name.length == 0) return
    lastValueFrom(this.http.delete(url, { headers, responseType: 'text' })).then((data) => {
      this.getTasks(board);
    })
  }

  private getCleanTaskObj(obj:any){
    let taskJson = {
      title: obj.title,
      description: obj.description,
      category: this.categoryService.getCategoryById(obj.category.id),
      assignedTo: this.userService.getUserByEmail(obj.assigned_to.email),
      createdFrom: this.userService.getUserByEmail(obj.created_from.email),
      createdAt: obj.created_at,
      dueDate: obj.due_date,
      label: this.labelService.getLabel(obj.label),
      priority: obj.priority,
      id: obj.id
    }
    return new Task(taskJson);
  }

}

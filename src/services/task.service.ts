import { inject, Injectable, signal, WritableSignal } from '@angular/core';

// inport models
import { Board, Category, Task } from '../shared/utils/models';

// import services
import { LabelService } from './label.service';
import { UserService } from './user.service';
import { CategoryService } from './category.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskList: WritableSignal<Task[]> = signal([]);

  labelService = inject(LabelService);
  categoryService = inject(CategoryService);
  userService = inject(UserService);

  constructor() { }

  public getTasks(board:Board){
    if (board.name == 'Board 1') {
      this.taskList.set([
        this.getCleanTaskObj({ title: 'API fertig machen. Eine Karrte mit sehr langem Titel', description: 'EndPoint Definieren und Authentifizierung anpassen', category: 'ToDo', boardId: 'ABC', assignedTo: 'user1@example.com', createdFrom: 'user2@example.com', createdAt: '2024-08-12', dueDate: '2024-09-28', label: 'Backend1', priority: 'high' }),
        this.getCleanTaskObj({ title: 'Design fertig machen', description: 'EndPoint Definieren und Authentifizierung anpassen. Ich habe eine sehr lange Beschreibung die über 2 Zeilen gehen sollte und irgendwann abgeschnitten wird.', category: 'In Progress', boardId: 'ABC', assignedTo: 'user1@example.com', createdFrom: 'user2@example.com', createdAt: '2024-06-12', dueDate: '2024-06-28', label: 'Frontend1', priority: 'medium' }),
        this.getCleanTaskObj({ title: 'GUI fertig machen', description: 'EndPoint Definieren und Authentifizierung anpassen', category: 'Done', boardId: 'ABC', assignedTo: 'user2@example.com', createdFrom: 'user1@example.com', createdAt: '2024-08-12', dueDate: '2024-09-28', label: 'Backend1', priority: 'low' }),
        this.getCleanTaskObj({ title: 'Customer Fragen klären', description: 'EndPoint Definieren und Authentifizierung anpassen', category: 'ToDo', boardId: 'ABC', assignedTo: 'user1@example.com', createdFrom: 'user2@example.com', createdAt: '2024-06-12', dueDate: '2024-06-28', label: 'Frontend1', priority: 'medium' }),
        this.getCleanTaskObj({ title: 'Projektmeeting erstellen', description: 'EndPoint Definieren und Authentifizierung anpassen', category: 'In Progress', boardId: 'ABC', assignedTo: 'user1@example.com', createdFrom: 'user2@example.com', createdAt: '2024-06-12', dueDate: '2024-06-28', label: 'Design1', priority: 'high' }),
        this.getCleanTaskObj({ title: 'Teamevent organisieren', description: 'EndPoint Definieren und Authentifizierung anpassen', category: 'ToDo', boardId: 'ABC', assignedTo: 'user2@example.com', createdFrom: 'user2@example.com', createdAt: '2024-08-12', dueDate: '2024-09-28', label: 'Design1', priority: 'low' }),
        this.getCleanTaskObj({ title: 'API fertig machen', description: 'EndPoint Definieren und Authentifizierung anpassen', category: 'Done', boardId: 'ABC', assignedTo: 'user1@example.com', createdFrom: 'user1@example.com', createdAt: '2024-06-12', dueDate: '2024-06-28', label: 'Frontend1', priority: 'medium' }),
        this.getCleanTaskObj({ title: 'API fertig machen', description: 'EndPoint Definieren und Authentifizierung anpassen', category: 'Done', boardId: 'ABC', assignedTo: 'user2@example.com', createdFrom: 'user2@example.com', createdAt: '2024-08-12', dueDate: '2024-09-28', label: 'Frontend1', priority: 'low' }),
        this.getCleanTaskObj({ title: 'API fertig machen', description: 'EndPoint Definieren und Authentifizierung anpassen', category: 'In Progress', boardId: 'ABC', assignedTo: 'user1@example.com', createdFrom: 'user2@example.com', createdAt: '2024-06-12', dueDate: '2024-06-28', label: 'Backend1', priority: 'high' }),
        this.getCleanTaskObj({ title: 'API fertig machen', description: 'EndPoint Definieren und Authentifizierung anpassen', category: 'ToDo', boardId: 'ABC', assignedTo: 'user1@example.com', createdFrom: 'user1@example.com', createdAt: '2024-08-12', dueDate: '2024-06-28', label: 'Backend1', priority: 'medium' }),
      ]);      
    } else {
      this.taskList.set([]);
    }
  }

  public createTask(newTask: Task) {
    this.taskList.update((tasks) => [...tasks, new Task(newTask)]);
    // ToDo upload in Server
  }

  public removeTask(task: Task) {
    this.taskList.update((tasks) => tasks.filter((t) => t !== task));
    // ToDo upload in Server
  }

  private getCleanTaskObj(obj:any){
    let taskJson = {
      title: obj.title,
      description: obj.description,
      category: this.categoryService.getCategory(obj.category),
      board: obj.board,
      assignedTo: this.userService.getUserByEmail(obj.assignedTo),
      createdFrom: this.userService.getUserByEmail(obj.createdFrom),
      createdAt: obj.createdAt,
      dueDate: obj.dueDate,
      label: this.labelService.getLabel(obj.label),
      priority: obj.priority
    }
    return new Task(taskJson);
  }


}

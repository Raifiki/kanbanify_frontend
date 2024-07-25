import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

// import models
import { Board, Category } from '../../shared/utils/models';

// import variables
import { environment } from '../../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: WritableSignal<Category[]> = signal([]);

  private http = inject(HttpClient);
  private categoryURL  = environment.serverUrl + 'category/';

  constructor() {}


  public getCategories(board:Board){
    const url = this.categoryURL + '?board=' + board.id;
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.getToken());
    if(board.name.length == 0) {
      this.categories.set([])
      return
    }
    lastValueFrom(this.http.get(url, { headers })).then((data) => {
      if (data instanceof Array) this.categories.set(this.getCategoryList(data));
    })
  }

  private getToken(){
    let temp = localStorage.getItem('credentials')
    return (temp)? JSON.parse(temp).token : ''
  }

  public getCategoryById(categoryId:number):Category | undefined{
    return this.categories().find(cat => cat.id === categoryId); // better to do with id
  }

  private getCategoryList(categoryListBE:any): Category[]{
    let categoryList: Category[] = [];
    if(categoryListBE instanceof Array) categoryListBE.forEach(categoryObjBE => categoryList.push(this.getCleanCategoryObj(categoryObjBE)));
    return categoryList
  }

  private getCleanCategoryObj(obj:any){
    return new Category({
      name: obj.title,
      notUpdatedOnSercer: false,
      position: obj.position,
      id: obj.id,
    });
  }

  public deleteCategory(category:Category, board:Board) {
    const url = this.categoryURL + category.id + '/' + '?board=' + board.id;
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.getToken());
    if(board.name.length == 0) return
    lastValueFrom(this.http.delete(url, { headers, responseType: 'text' })).then((data) => {
      this.getCategories(board);
    })
  }

  public addCategory(board:Board) {
    const url = this.categoryURL + '?board=' + board.id;
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.getToken());
    const body = {'title': 'New Category'}
    if(board.name.length == 0) return
    lastValueFrom(this.http.post(url, body,{ headers })).then((data) => {
      this.getCategories(board);
    })
  }

  public updateCategory(category:Category, board:Board) {
    const url = this.categoryURL + category.id + '/' + '?board=' + board.id;
    const headers = new HttpHeaders().set('Authorization', 'Token ' + this.getToken());
    const body = {'title': category.name}
    if(board.name.length == 0) return
    lastValueFrom(this.http.put(url, body,{ headers })).then((data) => {
      this.getCategories(board);
    })
  }

}

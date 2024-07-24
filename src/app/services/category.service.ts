import { Injectable, signal, WritableSignal } from '@angular/core';

// import models
import { Board, Category } from '../../shared/utils/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: WritableSignal<Category[]> = signal([]);

  constructor() { }


  public getCategories(board:Board){
    let catFromServer = [
      new Category('In Progress',true),
      new Category('ToDo', true),
      new Category('Done',true),
    ]
    this.categories.set( catFromServer);
  }

  private sortCategories(sortedCategoryNames:string[], categories:Category[]):Category[]{
    let sortedCategories:Category[] = [];
    sortedCategoryNames.forEach( name => {
      sortedCategories.push( categories.find(cat => cat.name === name) || new Category(name, false) );
    })
    return sortedCategories;
  }


  public getCategory(categoryName:string):Category | undefined{
    return this.categories().find(cat => cat.name === categoryName);
  }

  public deleteCategory(category:Category) {
    this.categories.update(categories => {
      let idx = categories.findIndex( cat => cat === category);
      categories.splice(idx, 1);
      return categories
    })
    // ToDo update server here
  }

  public addCategory() {
    this.categories.update(categories => {
      categories.push(new Category('New Category', false));
      return categories
    })
    // ToDo update server here
  }

}

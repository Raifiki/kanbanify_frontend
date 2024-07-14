export class Board{
    name:string = '';
    members: User[] = [];
    categories: string[] = [];
    id:string = '';

    constructor(boardJson?:any){
        if (boardJson) {
            this.name = boardJson.name || '';
            this.members = boardJson.members || [];
            this.categories = boardJson.categories || [];
            this.id = boardJson.id || '';
        }
    }
}


export class User{
    name:string = '';
    surename:string = '';
    activeBoard:Board = new Board();
    initials:string = '';
    email:string = '';
    boards:Board[] = [];

    constructor(userJson?:any){
        if (userJson) {
            this.name = userJson.name || '';
            this.surename = userJson.surename || '';
            this.initials = this.getInitials();
            this.activeBoard = userJson.activeBoard || new Board();
            this.email = userJson.email || '';
            this.boards = userJson.boards || [];
        }
    }

    private getInitials(){
        return this.name[0].toUpperCase() + this.surename[0].toUpperCase();
    }

    public changeName(newName:string){
        this.name = newName;
        this.initials = this.getInitials();
    }

    public changeSurename(newSurename:string){
        this.surename = newSurename;
        this.initials = this.getInitials();
    }

    public addBoard(board:Board){
        if(!this.boards.includes(board))this.boards.push(board);
    }

    public removeBoard(board:Board){
        if(this.boards.includes(board))this.boards.splice(this.boards.indexOf(board), 1);
    }

}

export class Category {
    public name:string = '';
    public notUpdatedOnSercer:boolean = true;

    constructor(name:string, snyWithServer?:boolean){
        this.name = name;
        this.notUpdatedOnSercer = !snyWithServer || false;
    }
}

export class Label{
    name:string = '';
    color:string = '';

    constructor(name?:string, color?:string){
        this.name = name || '';
        this.color = color || '';
    }
}

export class Task{
    title:string = '';
    label:Label = new Label();
    description:string = '';

    assignedTo:User = new User();
    dueDate:    Date | undefined = undefined;

    
    priority:'low'|'medium'|'high' = 'medium';
    
    category:Category = new Category('');
    createdAt:Date = new Date();
    createdFrom:User = new User();
    board:Board = new Board();


    constructor(taskJson?:any){
        if (taskJson) {
            this.title = taskJson.title || '';
            this.description = taskJson.description || '';
            this.category = taskJson.category || new Category('');
            this.board = taskJson.board || new Board();
            this.assignedTo = taskJson.assignedTo || new User();
            this.createdFrom = taskJson.createdFrom || new User();
            this.createdAt = new Date();
            this.dueDate = taskJson.dueDate || undefined;
            this.label = taskJson.label || new Label();
            this.priority = taskJson.priority || 'medium';
        }
    }
}
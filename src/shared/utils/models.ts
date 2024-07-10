export class Board{

    name:string = '';
    members: User[] = [];

    constructor(boardJson?:any){
        if (boardJson) {
            this.name = boardJson.name || '';
            this.members = boardJson.members || [];
        }
    }
}


export class User{
    name:string = '';
    surename:string = '';
    activeBoard:Board = new Board();
    initials:string = '';
    email:string = '';

    constructor(userJson?:any){
        if (userJson) {
            this.name = userJson.name || '';
            this.surename = userJson.surename || '';
            this.initials = this.getInitials();
            this.activeBoard = userJson.activeBoard || new Board();
            this.email = userJson.email || '';
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
}
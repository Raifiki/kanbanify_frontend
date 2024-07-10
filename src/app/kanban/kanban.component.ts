import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// user components 
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { BoardComponent } from "./board/board.component";

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    ToolbarComponent,
    BoardComponent
],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent {

}

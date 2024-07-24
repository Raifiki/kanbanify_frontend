import { Component, computed, inject, signal, Signal } from '@angular/core';

// user components 
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { BoardComponent } from "./board/board.component";
import { OverlayComponent } from "./overlay/overlay.component";

// import types and interfaces
import { OverlayState } from '../../shared/utils/interfaces';

// import services
import { ControllService } from '../services/controll.service';



@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    ToolbarComponent,
    BoardComponent,
    OverlayComponent
],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent {
  showOverlay: Signal<boolean> = signal(false);

  ctrService = inject(ControllService);

  constructor(){
    this.showOverlay = computed(() => {
      return this.ctrService.showOverlay();
    })
  }

}

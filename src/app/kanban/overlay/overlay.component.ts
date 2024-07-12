import { Component, computed, inject, signal, Signal } from '@angular/core';

// import types and interfaces
import { OverlayState } from '../../../shared/utils/interfaces';

// import services
import { ControllService } from '../../../services/controll.service';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss'
})
export class OverlayComponent {
  overlayType: Signal<OverlayState> = signal('addTask');
  showOverlay: Signal<boolean> = signal(true);

  ctrService = inject(ControllService);

  constructor(){
    this.overlayType = computed(() => {
      return this.ctrService.overlayType();
    })
    this.showOverlay = computed(() => {
      return this.ctrService.showOverlay();
    })
  }

  toggleOverlay(){
    this.ctrService.setShowOverlay(!this.showOverlay());
  }

}

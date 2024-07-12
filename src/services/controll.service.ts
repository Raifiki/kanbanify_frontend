import { Injectable, signal, WritableSignal } from '@angular/core';

// import types and interfaces
import { OverlayState } from '../shared/utils/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ControllService {
  overlayType: WritableSignal<OverlayState> = signal('addTask');
  showOverlay: WritableSignal<boolean> = signal(false);

  constructor() { }

  public setOverlayType(ovlyType: OverlayState){
    this.overlayType.set(ovlyType);
  }

  public setShowOverlay(show: boolean){
    this.showOverlay.set(show);
  }
}

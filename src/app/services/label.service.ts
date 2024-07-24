import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';

// import models
import { Board, Label } from '../../shared/utils/models';

// import services
import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  labels: WritableSignal<Label[]> = signal([]);
  constructor() {
    this.getLabels();
  }


  getLabels() {
      this.labels.set([
        new Label("Frontend", "#FF6F00"),
        new Label("Backend", "#FFA07A"),
        new Label("Design", "#2ECC71"),
        new Label("Customer", "#87CEFA")
      ])
  }

  addNewLabel(newLabel: Label) {
    this.labels.update((labels) => [...labels, newLabel]);
    this.updateLabelOnServer();
  }

  updateLabelOnServer(){
    // Todo: update Labels on server
  }

  getLabel(labelName: string): Label | undefined {
    return this.labels().find((label) => label.name == labelName);
  }

}


import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';

// import models
import { Board, Label } from '../shared/utils/models';

// import services
import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  labels: WritableSignal<Label[]> = signal([]);
  constructor() {}


  getLabels(board:Board) {
    if (board.name == 'Board 1') {
      this.labels.set([
        new Label("Frontend1", "#FF6F00"),
        new Label("Backend1", "#FFA07A"),
        new Label("Design1", "#2ECC71"),
        new Label("Customer1", "#87CEFA")
      ])
    } else {
      this.labels.set([
        new Label("Frontend2", "#FF6F00"),
        new Label("Backend2", "#FFA07A"),
        new Label("Design2", "#2ECC71"),
        new Label("Customer2", "#87CEFA")
      ])
    }
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


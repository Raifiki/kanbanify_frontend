import { Component, computed, inject, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import models
import { User } from '../../../../shared/utils/models';

// import services
import { UserService } from '../../../../services/user.service';
import { BoardService } from '../../../../services/board.service';
import { ControllService } from '../../../../services/controll.service';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.scss'
})
export class AddMemberComponent {
  userService = inject(UserService);
  boardService = inject(BoardService);
  controlService = inject(ControllService);

  userList: Signal<User[]> = signal([]);
  filteredUserList: Signal<User[]> = signal([]);

  searchPrompt: string = '';

  constructor() {
    this.userList = computed(() => {
      return this.userService.userList();
    })
    this.filterUserList();
  }

  filterUserList() {
    this.filteredUserList = computed(() => {
      return this.userList().filter(user => {
        return user.name.toLowerCase().includes(this.searchPrompt.toLowerCase()) || user.surename.toLowerCase().includes(this.searchPrompt.toLowerCase());
      })
    })
  }

  isUserMember(user:User){
    return this.controlService.selectedMembers.includes(user);
  }

  toggleUser(user:User){
    if (!this.controlService.selectedMembers.includes(user)) {
      this.controlService.selectedMembers.push(user);
      user.addBoard(this.boardService.selectedBoard());
    } else{
      let idx = this.controlService.selectedMembers.findIndex( u => u === user);
      this.controlService.selectedMembers.splice(idx, 1);
      user.removeBoard(this.boardService.selectedBoard());
    }
  }

  updateMembers(){
    if(this.isMemberSelectionValid()){
      this.boardService.updateBoardMembers(this.controlService.selectedMembers);
      this.controlService.setShowOverlay(false);
    }
  }

  isMemberSelectionValid(){
    return this.controlService.selectedMembers.length > 0;
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from '@app/core/authentication/models/action';

@Component({
  selector: 'access-role-action-pick-list',
  templateUrl: './access-role-action-pick-list.component.html'
})
export class AccessRoleActionPickListComponent {

  @Input() public actions: Action[] = [];

  @Output() public selectRow = new EventEmitter<number>();

  public onClick(index: number){
    this.selectRow.emit(index);
  }

}

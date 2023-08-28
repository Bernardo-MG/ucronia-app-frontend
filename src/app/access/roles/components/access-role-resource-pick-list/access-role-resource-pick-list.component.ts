import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Resource } from '@app/core/authentication/models/resource';

@Component({
  selector: 'access-role-resource-pick-list',
  templateUrl: './access-role-resource-pick-list.component.html'
})
export class AccessRoleResourcePickListComponent {

  @Input() public resources: Resource[] = [];

  @Output() public selectRow = new EventEmitter<number>();

  public onClick(index: number){
    this.selectRow.emit(index);
  }

}

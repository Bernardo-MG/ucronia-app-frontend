import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Active } from '@app/models/person/active';

@Component({
  selector: 'assoc-member-status-select',
  imports: [],
  templateUrl: './member-status-select.component.html'
})
export class MemberStatusSelectComponent {

  @Input() public disabled = false;

  @Output() public changeStatus = new EventEmitter<Active>();

  public status = Active.Active;

  public onChangeStatus(event: any) {
    const value = event.target.value as 'Active' | 'Inactive' | 'All';
    this.status = (Active[value] as Active);
    this.changeStatus.emit(this.status);
  }

}

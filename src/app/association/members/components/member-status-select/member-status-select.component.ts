import { Component, EventEmitter, Output } from '@angular/core';
import { Active } from '../../models/active';

@Component({
  selector: 'assoc-member-status-select',
  standalone: true,
  imports: [],
  templateUrl: './member-status-select.component.html'
})
export class MemberStatusSelectComponent {

  public status = Active.Active;

  @Output() public changeStatus = new EventEmitter<Active>();

  public onChangeStatus(event: any) {
    const value = event.target.value as 'Active' | 'Inactive' | 'All';
    this.status = (Active[value] as Active);
    this.changeStatus.emit(this.status);
  }

}

import { Component, input, output } from '@angular/core';
import { Active } from '@app/models/person/active';

@Component({
  selector: 'assoc-member-status-select',
  imports: [],
  templateUrl: './member-status-select.component.html'
})
export class MemberStatusSelectComponent {

  public readonly disabled = input(false);

  public readonly changeStatus = output<Active>();

  public status = Active.Active;

  public onChangeStatus(event: any) {
    const value = event.target.value as 'Active' | 'Inactive' | 'AllMember';
    this.status = (Active[value] as Active);
    this.changeStatus.emit(this.status);
  }

}

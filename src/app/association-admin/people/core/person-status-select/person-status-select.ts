import { Component, input, output } from '@angular/core';
import { Active } from '@app/domain/person/active';

@Component({
  selector: 'assoc-person-status-select',
  imports: [],
  templateUrl: './person-status-select.html'
})
export class PersonStatusSelect {

  public readonly disabled = input(false);

  public readonly changeStatus = output<Active>();

  public status = Active.Active;

  public onChangeStatus(event: any) {
    const value = event.target.value as 'Active' | 'Inactive' | 'AllMember' | 'All';
    this.status = (Active[value] as Active);
    this.changeStatus.emit(this.status);
  }

}

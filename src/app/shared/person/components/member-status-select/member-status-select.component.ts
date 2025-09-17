import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Active } from '@app/domain/person/active';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'assoc-member-status-select',
  imports: [FormsModule, SelectModule],
  templateUrl: './member-status-select.component.html'
})
export class MemberStatusSelectComponent {

  public readonly disabled = input(false);

  public readonly changeStatus = output<Active>();

  public status: 'Active' | 'Inactive' | 'AllMember' = 'Active';

  public readonly statuses = [{ name: 'Activo', value: 'Active' }, { name: 'Inactivo', value: 'Inactive' }, { name: 'Todos', value: 'AllMember' }];

  public onChangeStatus() {
    const newStatus = Active[this.status];
    this.changeStatus.emit(newStatus);
  }

}

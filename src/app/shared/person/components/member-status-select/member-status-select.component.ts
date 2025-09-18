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

  public readonly options = [{ name: 'Activo', value: 'Active' }, { name: 'Inactivo', value: 'Inactive' }, { name: 'Todos', value: 'AllMember' }];

  public status: 'Active' | 'Inactive' | 'AllMember' = 'Active';

  public onChangeStatus() {
    this.changeStatus.emit(Active[this.status]);
  }

}

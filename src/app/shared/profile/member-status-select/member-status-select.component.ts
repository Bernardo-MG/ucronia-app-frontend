import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberStatus } from '@ucronia/domain';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'assoc-member-status-select',
  imports: [FormsModule, SelectModule],
  templateUrl: './member-status-select.component.html'
})
export class MemberStatusSelectComponent {

  public readonly disabled = input(false);

  public readonly changeStatus = output<MemberStatus>();

  public readonly options = [{ name: 'Activo', value: 'Active' }, { name: 'Inactivo', value: 'Inactive' }, { name: 'Todos', value: 'All' }];

  public status: 'Active' | 'Inactive' | 'All' = 'Active';

  public onChangeStatus() {
    this.changeStatus.emit(MemberStatus[this.status]);
  }

}

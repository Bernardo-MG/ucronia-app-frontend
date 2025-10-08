import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Active } from '@app/domain/person/active';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'assoc-person-status-select',
  imports: [FormsModule, SelectModule],
  templateUrl: './person-status-select.html'
})
export class PersonStatusSelect {

  public readonly disabled = input(false);

  public readonly changeStatus = output<Active>();

  public readonly options = [{ name: 'Activo', value: 'Active' }, { name: 'Inactivo', value: 'Inactive' }, { name: 'Todos socios', value: 'AllMember' }, { name: 'No socio', value: 'NoMember' }, { name: 'Todos', value: '' }];

  public status: 'Active' | 'Inactive' | 'NoMember' | 'AllMember' = 'Active';

  public onChangeStatus() {
    this.changeStatus.emit(Active[this.status]);
  }

}

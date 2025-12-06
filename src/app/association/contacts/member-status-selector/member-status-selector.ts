import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'assoc-member-status-selector',
  imports: [FormsModule, SelectButtonModule],
  templateUrl: './member-status-selector.html'
})
export class MemberStatusSelector {

  public readonly select = output<'all' | 'active' | 'inactive'>();

  public memberStatusOptions: any[] = [{ label: 'Todos', value: 'all' }, { label: 'Activos', value: 'active' }, { label: 'Baja', value: 'inactive' }];
  public selectedMemberStatus: 'all' | 'active' | 'inactive' = 'all';

}

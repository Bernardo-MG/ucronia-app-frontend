import { Component, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberStatus } from '@ucronia/domain';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'assoc-member-status-selector',
  imports: [FormsModule, SelectButtonModule],
  templateUrl: './member-status-selector.html'
})
export class MemberStatusSelector {

  @Input() public set status(value: MemberStatus) {
    this.selectedMemberStatus = value;
  }

  public readonly filter = output<MemberStatus>();

  public memberStatusOptions: any[] = [{ label: 'Todos', value: MemberStatus.All }, { label: 'Activos', value: MemberStatus.Active }, { label: 'Baja', value: MemberStatus.Inactive }];
  public selectedMemberStatus: MemberStatus = MemberStatus.All;

}

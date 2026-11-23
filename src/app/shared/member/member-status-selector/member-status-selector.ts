import { Component, input, linkedSignal, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberStatus } from '@ucronia/domain';
import { SelectButtonModule } from '@openng/optimus-ui/selectbutton';

@Component({
  selector: 'assoc-member-status-selector',
  imports: [FormsModule, SelectButtonModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './member-status-selector.html'
})
export class MemberStatusSelector {

  public readonly status = input<MemberStatus>(MemberStatus.All);

  public readonly filter = output<MemberStatus>();

  protected readonly memberStatusOptions: any[] = [{ label: 'Todos', value: MemberStatus.All }, { label: 'Activos', value: MemberStatus.Active }, { label: 'Baja', value: MemberStatus.Inactive }];
  protected readonly selectedMemberStatus = linkedSignal(() => this.status());

}

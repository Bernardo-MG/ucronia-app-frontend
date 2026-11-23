import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Member } from '@ucronia/domain';
import { TagModule } from '@openng/optimus-ui/tag';

@Component({
  selector: 'assoc-member-status-tag',
  imports: [TagModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './member-status-tag.html'
})
export class MemberStatusTag {

  public readonly member = input(new Member());

}

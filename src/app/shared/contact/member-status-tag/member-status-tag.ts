import { Component, input } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'assoc-member-status-tag',
  imports: [TagModule],
  templateUrl: './member-status-tag.html'
})
export class MemberStatusTag {

  public readonly member = input(new Member());

}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Member } from '@app/association/members/shared/models/member';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'assoc-member-info-details',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './member-info-details.component.html'
})
export class MemberInfoDetailsComponent {

  @Input() data = new Member();

}

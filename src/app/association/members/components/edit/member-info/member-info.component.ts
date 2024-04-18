import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';
import { Member } from '../../../models/member';

@Component({
  selector: 'assoc-member-info',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './member-info.component.html'
})
export class MemberInfoComponent {

  @Input() data = new Member();

}

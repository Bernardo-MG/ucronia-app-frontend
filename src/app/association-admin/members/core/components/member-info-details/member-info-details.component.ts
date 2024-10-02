import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Member } from '@app/models/members/member';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';

@Component({
  selector: 'assoc-member-info-details',
  standalone: true,
  imports: [CommonModule, IconsModule, PlaceholderDirective],
  templateUrl: './member-info-details.component.html'
})
export class MemberInfoDetailsComponent {

  @Input() data = new Member();

  @Input() waiting = false;

}

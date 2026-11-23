import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@bernardo-mg/authentication';
import { TagModule } from '@openng/optimus-ui/tag';

@Component({
  selector: 'assoc-user-status-tag',
  imports: [TagModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './user-status-tag.html'
})
export class UserStatusTag {

  public readonly user = input(new User());

}

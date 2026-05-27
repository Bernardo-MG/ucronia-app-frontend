import { Component, input } from '@angular/core';
import { User } from '@bernardo-mg/authentication';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'assoc-user-status-tag',
  imports: [TagModule],
  templateUrl: './user-status-tag.html'
})
export class UserStatusTag {

  public readonly user = input(new User());

}

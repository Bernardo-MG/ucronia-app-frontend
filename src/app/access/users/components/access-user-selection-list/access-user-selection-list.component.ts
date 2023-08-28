import { Component, Input } from '@angular/core';
import { User } from '@app/core/authentication/models/user';

@Component({
  selector: 'access-user-selection-list',
  templateUrl: './access-user-selection-list.component.html'
})
export class AccessUserSelectionListComponent {

  @Input() public users: User[] = [];

}

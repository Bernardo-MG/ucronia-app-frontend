
import { Component, input, output } from '@angular/core';
import { User } from '@bernardo-mg/authentication';
import { PlaceholderDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'access-user-info-details',
  imports: [PlaceholderDirective],
  templateUrl: './access-user-info-details.component.html'
})
export class AccessUserInfoDetailsComponent {

  readonly data = input(new User());

  public readonly showMenu = input(false);

  public readonly deletable = input(false);

  public readonly editable = input(false);

  public readonly waiting = input(false);

  public readonly delete = output<void>();

  public readonly startEditing = output<void>();

}

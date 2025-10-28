
import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { Role } from '@bernardo-mg/authentication';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';

@Component({
  selector: 'access-user-roles-editor',
  imports: [ButtonModule, PickListModule],
  templateUrl: './access-user-roles-editor.html'
})
export class AccessUserRolesEditor implements OnChanges {

  public readonly selection = input<Role[]>([]);
  public readonly roles = input<Role[]>([]);

  public readonly save = output<Role[]>();

  public selected: Role[] = [];

  public ngOnChanges({ roles }: SimpleChanges): void {
    if (roles) {
      this.selected = [...roles.currentValue];
    }
  }

}


import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { Role } from '@bernardo-mg/authentication';
import { SortingProperty } from '@bernardo-mg/request';

@Component({
  selector: 'access-role-selection-list',
  imports: [RouterModule, SortingButtonComponent],
  templateUrl: './access-role-selection-list.component.html'
})
export class AccessRoleSelectionListComponent {

  public readonly roles = input<Role[]>([]);

  public readonly routeLinkAdapter = input<(data: Role) => string>((data) => '');

  public readonly changeDirection = output<SortingProperty>();

}

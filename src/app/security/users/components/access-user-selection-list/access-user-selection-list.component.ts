
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { User } from '@bernardo-mg/authentication';
import { SortingProperty } from '@bernardo-mg/request';

@Component({
  selector: 'access-user-selection-list',
  imports: [RouterModule, SortingButtonComponent],
  templateUrl: './access-user-selection-list.component.html'
})
export class AccessUserSelectionListComponent {

  public readonly users = input<User[]>([]);

  public readonly routeLinkAdapter = input<(data: User) => string>((data) => '');

  public readonly changeDirection = output<SortingProperty>();

}

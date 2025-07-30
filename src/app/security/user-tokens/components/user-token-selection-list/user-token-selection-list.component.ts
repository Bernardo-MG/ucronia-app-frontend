
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { UserToken } from '@bernardo-mg/authentication';
import { SortingProperty } from '@bernardo-mg/request';

@Component({
  selector: 'access-user-token-selection-list',
  imports: [RouterModule, SortingButtonComponent],
  templateUrl: './user-token-selection-list.component.html'
})
export class UserTokenSelectionListComponent {

  public readonly userTokens = input<UserToken[]>([]);

  public readonly routeLinkAdapter = input<(data: UserToken) => string>((data) => '');

  public readonly changeDirection = output<SortingProperty>();

}

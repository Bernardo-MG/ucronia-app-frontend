import { Component, input, output } from '@angular/core';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'pagination-info',
  imports: [PaginationNavigationComponent, JustifyCenterDirective],
  templateUrl: './pagination-info.component.html'
})
export class PaginationInfoComponent {

  public readonly waiting = input(false);

  public readonly current = input(1);

  public readonly pages = input(0);

  public readonly totalElements = input(0);

  public readonly goTo = output<number>();

}

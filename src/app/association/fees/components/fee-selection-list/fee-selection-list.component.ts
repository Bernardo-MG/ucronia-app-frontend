import { Component, Input } from '@angular/core';
import { Fee } from '@app/association/models/fee';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'fee-selection-list',
  templateUrl: './fee-selection-list.component.html'
})
export class FeeSelectionListComponent {

  @Input() public fees: Fee[] = [];

  public activeIcon = faCheck;
  public inactiveIcon = faX;

}

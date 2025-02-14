import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Fee } from '@app/models/fees/fee';
import { IconFailureComponent } from '@bernardo-mg/icons';

@Component({
    selector: 'assoc-my-fees-list',
    imports: [CommonModule, IconFailureComponent],
    templateUrl: './my-fees-list.component.html'
})
export class MyFeesListComponent {

  @Input() public fees: Fee[] = [];

}

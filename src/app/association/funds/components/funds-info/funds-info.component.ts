import { Component, Input } from '@angular/core';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'assoc-funds-info',
  templateUrl: './funds-info.component.html'
})
export class FundsInfoComponent {

  @Input() data = new Transaction();

}

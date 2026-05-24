
import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { DetailField, StatusField } from '@bernardo-mg/ui';
import { Fee } from '@ucronia/domain';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'assoc-fee-details',
  imports: [CardModule, DetailField, StatusField, DatePipe],
  templateUrl: './fee-details.html'
})
export class FeeDetails {

  public readonly loading = input(false);
  public readonly data = input(new Fee());

}

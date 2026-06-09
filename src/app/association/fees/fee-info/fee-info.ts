
import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { DetailField, StatusDetail } from '@bernardo-mg/ui';
import { Fee } from '@ucronia/domain';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'assoc-fee-info',
  imports: [CardModule, DetailField, StatusDetail, DatePipe],
  templateUrl: './fee-info.html'
})
export class FeeInfo {

  public readonly loading = input(false);
  public readonly data = input(new Fee());

}

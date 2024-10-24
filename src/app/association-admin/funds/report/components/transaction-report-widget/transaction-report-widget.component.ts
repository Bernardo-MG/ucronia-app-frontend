import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from '@app/shared/card/card.module';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'assoc-transaction-report-widget',
  standalone: true,
  imports: [CommonModule, IconsModule, CardModule],
  templateUrl: './transaction-report-widget.component.html'
})
export class TransactionReportWidgetComponent {

}

import { Component } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { MemberBalanceChartWidgetComponent } from '../member-balance-chart-widget/member-balance-chart-widget.component';
import { MemberListWidgetComponent } from '../member-list-widget/member-list-widget.component';

@Component({
  selector: 'assoc-member-frontpage',
  standalone: true,
  imports: [LayoutModule, MemberBalanceChartWidgetComponent, MemberListWidgetComponent],
  templateUrl: './member-frontpage.component.html'
})
export class MemberFrontpageComponent {

}

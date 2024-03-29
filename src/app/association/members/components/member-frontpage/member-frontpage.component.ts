import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { MemberBalanceChartWidgetComponent } from '../member-balance-chart-widget/member-balance-chart-widget.component';
import { MemberListWidgetComponent } from '../member-list-widget/member-list-widget.component';

@Component({
  selector: 'assoc-member-frontpage',
  standalone: true,
  imports: [MemberBalanceChartWidgetComponent, MemberListWidgetComponent, ArticleComponent],
  templateUrl: './member-frontpage.component.html'
})
export class MemberFrontpageComponent {

}

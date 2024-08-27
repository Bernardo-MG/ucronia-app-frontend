import { Component } from '@angular/core';
import { MemberBalanceChartWidgetComponent } from '@app/association/members/balance/components/member-balance-chart-widget/member-balance-chart-widget.component';
import { MemberListWidgetComponent } from '@app/association/members/core/components/member-list-widget/member-list-widget.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
  selector: 'assoc-member-frontpage',
  standalone: true,
  imports: [MemberBalanceChartWidgetComponent, MemberListWidgetComponent, ArticleComponent, JustifyCenterDirective],
  templateUrl: './member-frontpage.component.html'
})
export class MemberFrontpageComponent {

}
